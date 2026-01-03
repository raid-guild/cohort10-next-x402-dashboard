# API Key Integration Guide for Backend Team

## Overview

The Next.js dashboard now generates and manages organization-level API keys for the x402 facilitator. This document explains how to integrate the facilitator with the shared database.

## API Key Format

**Production Keys**: `rg_live_` + 32 hex characters
**Test Keys**: `rg_test_` + 32 hex characters

Example: `rg_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

## Database Schema

The `organizations` table now includes:

```sql
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES public.users(id) NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- API Key fields
  api_key TEXT UNIQUE,                    -- Prefixed key for display (e.g., rg_live_...)
  api_key_hash TEXT,                      -- Bcrypt hash for validation
  api_key_expires_at TIMESTAMPTZ,         -- Expiry timestamp
  api_key_environment TEXT DEFAULT 'live' -- 'live' or 'test'
    CHECK (api_key_environment IN ('live', 'test'))
);

CREATE INDEX idx_organizations_api_key_hash ON public.organizations(api_key_hash);
```

## Authentication Flow

### 1. API Request

The facilitator receives an API request with the key in the header:

```http
GET /api/some-endpoint
X-API-Key: rg_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2. Database Query

Query all active organizations (or use caching):

```sql
SELECT
  id,
  api_key_hash,
  api_key_expires_at,
  api_key_environment
FROM organizations
WHERE api_key_environment = 'live'
  AND api_key_expires_at > NOW()
  AND api_key_hash IS NOT NULL;
```

### 3. Hash Comparison

Use bcrypt to compare the provided key against each hash:

```go
import "golang.org/x/crypto/bcrypt"

func ValidateAPIKey(providedKey string, orgs []Organization) (*Organization, error) {
    for _, org := range orgs {
        // Compare the provided key with the stored hash
        err := bcrypt.CompareHashAndPassword(
            []byte(org.APIKeyHash),
            []byte(providedKey),
        )

        if err == nil {
            // Key matches! Check expiry
            if time.Now().Before(org.ExpiresAt) {
                return &org, nil
            }
            return nil, errors.New("API key expired")
        }
    }

    return nil, errors.New("invalid API key")
}
```

### 4. Environment Check

- **Production facilitator**: Only accept keys with `api_key_environment = 'live'`
- **Test facilitator**: Accept both `live` and `test` keys (or only `test` keys)

## Implementation Example (Go)

```go
package main

import (
    "database/sql"
    "errors"
    "net/http"
    "time"

    "golang.org/x/crypto/bcrypt"
    _ "github.com/lib/pq"
)

type Organization struct {
    ID          string
    APIKeyHash  string
    ExpiresAt   time.Time
    Environment string
}

type Authenticator struct {
    db *sql.DB
}

func NewAuthenticator(databaseURL string) (*Authenticator, error) {
    db, err := sql.Open("postgres", databaseURL)
    if err != nil {
        return nil, err
    }

    return &Authenticator{db: db}, nil
}

func (a *Authenticator) ValidateRequest(r *http.Request) (*Organization, error) {
    // 1. Extract API key from header
    apiKey := r.Header.Get("X-API-Key")
    if apiKey == "" {
        return nil, errors.New("missing API key")
    }

    // 2. Validate key format
    if !isValidKeyFormat(apiKey) {
        return nil, errors.New("invalid API key format")
    }

    // 3. Query database for active organizations
    orgs, err := a.getActiveOrganizations()
    if err != nil {
        return nil, err
    }

    // 4. Compare hash
    for _, org := range orgs {
        err := bcrypt.CompareHashAndPassword(
            []byte(org.APIKeyHash),
            []byte(apiKey),
        )

        if err == nil {
            // Key matches! Verify expiry
            if time.Now().Before(org.ExpiresAt) {
                return &org, nil
            }
            return nil, errors.New("API key expired")
        }
    }

    return nil, errors.New("invalid API key")
}

func (a *Authenticator) getActiveOrganizations() ([]Organization, error) {
    query := `
        SELECT id, api_key_hash, api_key_expires_at, api_key_environment
        FROM organizations
        WHERE api_key_environment = 'live'
          AND api_key_expires_at > NOW()
          AND api_key_hash IS NOT NULL
    `

    rows, err := a.db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var orgs []Organization
    for rows.Next() {
        var org Organization
        err := rows.Scan(
            &org.ID,
            &org.APIKeyHash,
            &org.ExpiresAt,
            &org.Environment,
        )
        if err != nil {
            return nil, err
        }
        orgs = append(orgs, org)
    }

    return orgs, nil
}

func isValidKeyFormat(key string) bool {
    // Check format: rg_(live|test)_[32 hex chars]
    if len(key) != 42 { // "rg_" (3) + "live_" (5) + 32 hex = 40, or "rg_test_" (8) + 32 = 42
        return false
    }

    if key[:3] != "rg_" {
        return false
    }

    // Additional validation can be added here
    return true
}
```

## Configuration

### Environment Variables

```bash
# Required: Database connection string
DATABASE_URL=postgresql://user:password@host:port/database

# Example for Supabase
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Connection Pooling

Recommended settings for production:

```go
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(5)
db.SetConnMaxLifetime(5 * time.Minute)
```

## Performance Optimization

### Caching Strategy

To avoid database queries on every request:

```go
type CachedOrg struct {
    Organization
    CachedAt time.Time
}

var (
    orgCache     = make(map[string]CachedOrg)
    cacheMutex   sync.RWMutex
    cacheTTL     = 5 * time.Minute
)

func (a *Authenticator) ValidateRequestWithCache(r *http.Request) (*Organization, error) {
    apiKey := r.Header.Get("X-API-Key")

    // Check cache first
    cacheMutex.RLock()
    cached, exists := orgCache[apiKey]
    cacheMutex.RUnlock()

    if exists && time.Since(cached.CachedAt) < cacheTTL {
        if time.Now().Before(cached.ExpiresAt) {
            return &cached.Organization, nil
        }
        // Expired, remove from cache
        cacheMutex.Lock()
        delete(orgCache, apiKey)
        cacheMutex.Unlock()
        return nil, errors.New("API key expired")
    }

    // Not in cache, validate against database
    org, err := a.ValidateRequest(r)
    if err != nil {
        return nil, err
    }

    // Cache the result
    cacheMutex.Lock()
    orgCache[apiKey] = CachedOrg{
        Organization: *org,
        CachedAt:     time.Now(),
    }
    cacheMutex.Unlock()

    return org, nil
}
```

## Error Codes

Return appropriate HTTP status codes:

- `401 Unauthorized`: Missing or invalid API key
- `403 Forbidden`: API key expired
- `429 Too Many Requests`: Rate limit exceeded (if implemented)
- `500 Internal Server Error`: Database connection issues

## Testing

### Test with curl

```bash
# Valid key
curl -H "X-API-Key: rg_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
     http://localhost:8080/api/endpoint

# Invalid key
curl -H "X-API-Key: invalid_key" \
     http://localhost:8080/api/endpoint

# Missing key
curl http://localhost:8080/api/endpoint
```

### Database Test Queries

```sql
-- Check active keys
SELECT
  id,
  name,
  api_key,
  api_key_expires_at,
  api_key_environment,
  api_key_expires_at > NOW() as is_active
FROM organizations
WHERE api_key IS NOT NULL;

-- Manually verify a hash
SELECT
  id,
  name,
  api_key_hash
FROM organizations
WHERE api_key = 'rg_live_...'; -- Replace with actual key
```

## Security Considerations

1. **Never log API keys**: Redact keys in logs
2. **Use HTTPS only**: API keys should never be transmitted over HTTP
3. **Rate limiting**: Implement per-organization rate limits
4. **Monitor for abuse**: Track failed authentication attempts
5. **Rotate keys**: Encourage users to rotate keys periodically

## Questions?

Contact the frontend team for:

- Database connection details
- Sample API keys for testing
- Access to staging environment

## Migration Checklist

- [ ] Update facilitator to connect to shared database
- [ ] Implement bcrypt hash comparison
- [ ] Add environment check (live vs test)
- [ ] Implement caching strategy
- [ ] Add error handling for expired keys
- [ ] Test with sample API keys
- [ ] Deploy to staging
- [ ] Verify end-to-end authentication flow
