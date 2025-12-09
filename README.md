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

- **Biome + Ultracite**: Formats and lints staged files
- **Stage fixed files**: Automatically stages formatted changes
- **Enforces conventional commits**: Via commit message format

The hook configuration is in `lefthook.yml`.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles with RG design tokens
│   ├── layout.tsx         # Root layout with fonts and theme
│   ├── page.tsx           # Home/landing page
│   └── ui/                # UI component showcase page
├── components/
│   ├── ui/                # 42+ reusable UI components
│   ├── examples/          # Component usage examples
│   ├── shared/            # Header, Footer, NavLinks
│   ├── landing/           # Landing page sections (to be created)
│   └── illustrations/     # Illustration gallery
├── lib/
│   ├── fonts.ts           # RaidGuild brand fonts
│   ├── theme-context.tsx  # Light/dark mode context
│   └── utils.ts           # Utility functions (cn, etc.)
public/
├── assets/
│   ├── webp/              # 90+ brand illustrations
│   ├── logos/             # RaidGuild logos
│   └── icon/              # Icon sets
└── fonts/                 # RaidGuild brand fonts
docs/
└── ui-components.md       # Comprehensive component catalog
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

42+ production-ready components built on Radix UI primitives:splay-lg mb-8">Welcome to RaidGuild</h1>
<p className="text-body-lg text-muted-foreground mb-8">
Built with the RaidGuild brand guidelines
</p>

      <div className="flex items-center space-x-2">
        <Switch id="example-switch" />
        <label htmlFor="example-switch" className="text-body-base">
          Example switch component
        </label>
      </div>
    </div>

);
}

```

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

#### For LLM Developer Agents

**Always include the UI Components Catalog in your prompt context** when working with LLM agents (Cursor, GitHub Copilot, ChatGPT, etc.). This ensures the agent:

- Knows what components are available
- Uses existing components instead of creating custom alternatives
- Follows design system patterns
- Uses correct imports and props

- **Layout**: Card, Sheet, Dialog, Drawer, Tabs, Accordion
- **Forms**: Input, Textarea, Select, Checkbox, Radio, DatePicker, Combobox, Multiselect
- **Navigation**: NavigationMenu, Breadcrumb, Pagination, Sidebar
- **Feedback**: Progress, Skeleton, HoverCard, Tooltip
- **Data**: Table, DataTable, Chart
- **Actions**: Button, DropdownMenu, Command, Menubar
- **Utilities**: Badge, Kbd, Separator, ScrollArea, Popover

**Full catalog**: See [`docs/ui-components.md`](docs/ui-components.md) for complete component documentation with examples, props, and usage patterns.

### Visual Assets

**Illustrations Library**: 90+ hand-drawn illustrations in `public/assets/webp/`
- Sizes: 1440x1440 (square), 1080x1440 (portrait), 1440x550 (wide)
- Variants: Color and black & white versions
- Categories: Warriors, castles, nature, architecture

**Logos**: Multiple variants in `public/assets/logos/`

## Landing Page Plan

### Sections to Build

1. **Hero Section** — Value prop, CTAs, hero image
2. **Features Section** — Key benefits with cards
3. **How It Works** — Step-by-step process
4. **Stats/Social Proof** — Metrics cards
5. **FAQ** — Accordion with common questions
6. **CTA/Lead Capture** — Contact/demo form

### Components to Create

Create in `src/components/landing/`:
- `HeroSection.tsx` — Hero with CTA buttons
- `FeaturesSection.tsx` — Feature cards grid
- `StatsSection.tsx` — Metrics display
- `CTASection.tsx` — Lead capture form

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

- **Go Facilitator**: [raid-guild/x402-facilitator](https://github.com/raid-guild/x402-facilitator) (backend)
- **Brand Guidelines**: [brand.raidguild.org](https://brand.raidguild.org/)

## License

MIT

## Contact

- **Discord**: RaidGuild Discord
- **GitHub**: [@raid-guild](https://github.com/raid-guild)
- **Website**: [raidguild.org](https://raidguild.org)
```
