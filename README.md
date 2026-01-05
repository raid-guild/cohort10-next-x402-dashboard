# RaidGuild x402 Facilitator Dashboard

**Turn APIs into revenue streams. Bring devs into the RaidGuild orbit.**

A Next.js frontend for the RaidGuild x402 facilitator — enabling developers to charge micro-payments for API calls instantly, trustlessly, and without signup friction.

## What is x402?

x402 is an emerging standard for autonomous payments on Base and beyond. This dashboard provides:

- **Marketing/Landing Page** — Explain the facilitator, use cases, and integration patterns
- **Developer Dashboard** — Manage API keys for the hosted facilitator service
- **Documentation** — Quick-start guides for both self-hosted and hosted flows

## Project Overview

This is the **Next.js frontend** component of the RaidGuild x402 facilitator stack. The Go server handles actual payment processing, while this frontend provides the hosted service experience, developer onboarding, and admin tools.

## API Keys: Pricing, Expiry, and x402 Dogfooding

API keys are purchased via x402 (no traditional billing) and expire after **30 days**.
Key generation always requires payment, and a key is only created after a successful `verify` + `settle`.

- **Price per key**: set via `PRICE_IN_USDC` (default target: `0.1`)
- **Expiry**: enforced via `api_keys.expires_at`
- **Network**: **Base only** for now (chainId `8453`)

### External Facilitator Integration (Next.js)

This repo uses the hosted `x402-facilitator-go` service to verify and settle **exact (EIP-3009)** payments.

**Env Vars**

- `X402_FACILITATOR_URL=https://cohort-x402-go.vercel.app`
- `X402_FACILITATOR_API_KEY=cohort-10-rules`
- `X402_NETWORK=base`
- `USDC_BASE_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- `SERVICE_RECIPIENT_ADDRESS=<your receiving address>`
- `PRICE_IN_USDC=0.1`

**Flow**

1. `POST /api/keys/generate` returns `402` with `paymentRequirements` (exact v2, Base, USDC).
2. Client signs EIP-712 `TransferWithAuthorization` and retries with `X-402-Payment` header.
3. Server calls facilitator `POST /verify` then `POST /settle`.
4. On success, create key and set `expires_at = now + 30 days`.

**Notes**

- `amount` is raw USDC units (6 decimals). `amountDecimal` is optional but helpful for UI.
- `extra.name` must be `USD Coin` and `extra.version` must be `2` for Base USDC.
- Use `x402Version: 2` for `eip155:8453`.

### Architecture

- **Go Backend**: Self-contained facilitator handling x402 payment processing
- **Next.js Frontend**: Dashboard, marketing, and developer onboarding (this repo)
- **Supabase/Postgres**: Stores hashed API keys for hosted service
- **Decoupled Design**: Go server can run standalone; frontend is optional

## Tech Stack

- **Framework**: Next.js 15.5.5 with Turbopack
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4.0 with RaidGuild design tokens
- **UI Components**: 42+ components built on Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Type Safety**: TypeScript 5
- **Code Quality**: Biome + Ultracite
- **Git Hooks**: Lefthook

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/raid-guild/cohort10-next-x402-dashboard.git
cd cohort10-next-x402-dashboard

# Install dependencies
bun install
# or npm install

# Run development server
bun dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Available Scripts

### Git Hooks (Lefthook)

This project uses Lefthook for automated code quality checks:

**Pre-commit hooks:**

- TypeScript type checking (skipped during merge/rebase)
- Runs automatically on `git commit`

**Configuration:**

- Biome checks are available but disabled by default for faster commits
- Build checks disabled for faster pushes (builds are handled by CI/CD)
- Edit `lefthook.yml` to customize or enable additional checks

To skip hooks when needed:

```bash
git commit --no-verify
git push --no-verify
```

The hook configuration is in `lefthook.yml`.

## Project Structure

```
.
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── globals.css        # Global styles with RG design tokens
│   │   ├── layout.tsx         # Root layout with fonts and theme
│   │   ├── page.tsx           # Home/landing page
│   │   └── ui/                # UI component showcase page
│   ├── components/
│   │   ├── ui/                # 42+ reusable UI components
│   │   ├── shared/            # Header, Footer, NavLinks
│   │   ├── landing/           # Landing page sections
│   └── lib/
│       ├── fonts.ts           # RaidGuild brand fonts
│       ├── theme-context.tsx  # Light/dark mode context
│       └── utils.ts           # Utility functions (cn, etc.)
├── public/
│   ├── assets/
│   │   ├── webp/              # 90+ brand illustrations
│   │   │   ├── 1440x1440/    # Square format
│   │   │   ├── 1080x1440/    # Portrait format
│   │   │   ├── 1440x550/     # Wide format
│   │   │   └── thumbnails/   # Thumbnail versions
│   │   ├── logos/             # RaidGuild logos
│   │   └── icon/              # Icon sets (8bit, dd, magic)
│   └── fonts/                 # RaidGuild brand fonts
├── docs/
│   └── ui-components.md       # Comprehensive component catalog
├── .github/
│   └── copilot-instructions.md # AI coding assistant guidelines
├── biome.jsonc                # Biome linter configuration
├── lefthook.yml               # Git hooks configuration
├── components.json            # shadcn/ui config
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Design System

### RaidGuild Brand

This project uses the **RaidGuild brand guidelines** from [brand.raidguild.org](https://brand.raidguild.org/).

#### Typography

- **Display**: Mazius Display — `.type-display-lg` (80px), `.type-display-md` (60px), `.type-display-sm` (48px)
- **Body**: EB Garamond — `.type-body-lg` (20px), `.type-body-base` (16px), `.type-body-sm` (12px)
- **Mono**: Ubuntu Mono — for code blocks
- **Labels**: `.type-label` (uppercase with letter spacing)

#### Color Palettes

**Moloch (Warm Reds)**:

- `moloch-100` through `moloch-800`
- Primary: `moloch-500` (#bd482d)
- Use for: Primary CTAs, accents, brand highlights

**Scroll (Warm Yellows)**:

- `scroll-100` through `scroll-800`
- Primary: `scroll-700` (#b5a22c)
- Use for: Secondary actions, highlights

**Neutrals**: `neutral-100` through `neutral-800`, plus `neutral-white` and `neutral-black`

#### Layout System

- **Container**: `.container-custom` — Max-width 1280px, responsive padding
- **Grid**: `.grid-custom` — 4 cols (mobile) → 8 cols (tablet) → 12 cols (desktop)
- **Border Radius**: Base 0.625rem

### UI Components

42+ production-ready components built on Radix UI primitives.

### 4. Available Typography Classes

- **Display**: `.text-display-lg`, `.text-display-md`, `.text-display-sm`
- **Headings**: `.text-heading-lg`, `.text-heading-md`
- **Body**: `.text-body-lg`, `.text-body-base`, `.text-body-sm`
- **Labels**: `.text-label` (uppercase with letter spacing)

### 5. Available Color Classes

The brand includes two main color palettes:

- **Moloch** (warm reds): `moloch-100` through `moloch-800`
- **Scroll** (warm yellows): `scroll-100` through `scroll-800`

Use with Tailwind classes like `bg-moloch-400`, `text-scroll-600`, etc.

### 6. Grid System

Use `.container-custom` for consistent max-width and padding, and `.grid-custom` for responsive grid layouts that adapt from 4 columns (mobile) to 12 columns (desktop).

### 7. UI Components Catalog

A comprehensive catalog of all available UI components is available in `docs/ui-components.md`. This document is **essential** when working with LLM developer agents.


## Contributing

This is a RaidGuild Cohort 10 project. Contributions should follow:

1. **Conventional commits** — Required format enforced by pre-commit hooks
2. **Verified commits** — Sign your commits with GPG
3. **Biome formatting** — Run `bun format` before committing (or let pre-commit hook handle it)
4. **Component-first approach** — Use existing UI components from `src/components/ui/`
5. **Brand guidelines** — Follow RaidGuild design tokens and patterns

### For LLM Developer Agents

When working with AI coding assistants:

1. **Always reference** [`docs/ui-components.md`](docs/ui-components.md) in your context
2. Use existing components instead of creating custom alternatives
3. Follow design system patterns and tokens
4. Import from `@/components/ui/` for all UI elements

## Related Repositories

- **Go Facilitator**: [raid-guild/x402-facilitator](https://github.com/raid-guild/x402-facilitator-go) (backend)
- **Brand Guidelines**: [brand.raidguild.org](https://brand.raidguild.org/)

## License

MIT

## Contact

- **Discord**: RaidGuild Discord
- **GitHub**: [@raid-guild](https://github.com/raid-guild)
- **Website**: [raidguild.org](https://raidguild.org)
```
