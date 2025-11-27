# RaidGuild Brand Guidelines

2024 Q4 Refresh

## Setting Up a New App with RaidGuild Brand Guidelines

This guide will help you integrate the RaidGuild brand guidelines into a new Next.js application.

### 1. Install Required Dependencies

```bash
# Core dependencies
npm install class-variance-authority clsx lucide-react tailwind-merge

# Development dependencies
npm install -D @tailwindcss/postcss tw-animate-css
```

### 2. Add Font Files

Create a `public/fonts/` directory and add the RaidGuild brand fonts:

```
public/
  fonts/
    ├── MAZIUSREVIEW20.09-Regular.otf
    ├── MAZIUSREVIEW20.09-Regular.woff
    ├── EBGaramond-VariableFont_wght.ttf
    └── EBGaramond-Italic-VariableFont_wght.ttf
```

Copy `src/lib/fonts.ts`: into your project.

Update your `src/app/layout.tsx` to include the fonts:

```typescript
import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, ubuntuMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "My RaidGuild App",
  description: "Built with RaidGuild brand guidelines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
```

### 2. Update Global CSS

Replace your `src/app/globals.css` with the RaidGuild brand styles from the globall.css file in this repo.

### 3. Add Components

#### EXAMPLE

Create `src/components/ui/switch.tsx`:

```typescript
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
```

#### Example Usage

Now you can use the RaidGuild brand styles and components in your app:

```typescript
import { Switch } from "@/components/ui/switch";

export default function HomePage() {
  return (
    <div className="container-custom py-16">
      <h1 className="text-display-lg mb-8">Welcome to RaidGuild</h1>
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

#### Example Prompt Template

```
I need to build a [feature description].

Please use components from the UI Components Catalog (docs/ui-components.md). 
Always prefer existing components over creating custom ones.

Requirements:
- [Requirement 1]
- [Requirement 2]

Make sure to:
- Import from @/components/ui/[component-name]
- Follow design system patterns
- Use correct variants and props
```

#### What's in the Catalog

The catalog includes:
- Complete list of all 42+ UI components
- Detailed descriptions and use cases
- Import paths and exports
- Component variants and props
- Design tokens (colors, typography, spacing)
- Common component combinations
- Code examples and patterns
- Quick reference guide
- Accessibility guidelines

**Location:** `docs/ui-components.md`

**When to use:** Always reference this document when building UI features or working with LLM agents.
