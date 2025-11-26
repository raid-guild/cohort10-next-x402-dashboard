"use client";

import Link from "next/link";
import { useState } from "react";
import { SwitchExample } from "@/components/examples/SwitchExample";
import { ButtonExample } from "@/components/examples/ButtonExample";

export default function UIPage() {
  const [activeTab, setActiveTab] = useState<"getting-started" | "examples">(
    "getting-started"
  );

  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="type-display-lg mb-8">UI Components</h1>

        {/* Intro Section */}
        <section className="mb-8">
          <h2 className="type-heading-lg mb-4">Component Stack</h2>
          <p className="type-body-lg text-muted-foreground mb-4">
            The RaidGuild UI component library is built with{" "}
            <strong className="text-foreground">Tailwind CSS</strong> and{" "}
            <strong className="text-foreground">shadcn/ui</strong>, providing a
            comprehensive set of accessible, customizable components. This
            example demonstrates the components set up in a{" "}
            <strong className="text-foreground">Next.js</strong> application,
            showcasing how to integrate the RaidGuild brand guidelines into your
            project.
          </p>
        </section>

        {/* GitHub Link */}
        <div className="mb-8 p-4 border border-border rounded-lg bg-muted/30">
          <h2 className="type-heading-md mb-4">Source Code</h2>
          <p className="text-body-base text-muted-foreground mb-4">
            The complete component library, installation instructions, and brand
            guidelines are available on GitHub.
          </p>
          <Link
            href="https://github.com/raid-guild/brand"
            className="inline-flex items-center text-lg text-primary hover:text-primary/80 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("getting-started")}
            className={`px-6 py-3 type-body-lg transition-colors border-b-2 ${
              activeTab === "getting-started"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Getting Started
          </button>
          <button
            onClick={() => setActiveTab("examples")}
            className={`px-6 py-3 type-body-lg transition-colors border-b-2 ${
              activeTab === "examples"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Component Examples
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "getting-started" && (
          <section>
            <h2 className="type-heading-lg mb-6">Getting Started</h2>
            <div className="space-y-6">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="type-heading-md mb-4">
                  1. Install Required Dependencies
                </h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`# Core dependencies
npm install class-variance-authority clsx lucide-react tailwind-merge

# Development dependencies
npm install -D @tailwindcss/postcss tw-animate-css`}</code>
                </pre>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <h3 className="type-heading-md mb-4">2. Add Font Files</h3>
                <p className="text-body-base text-muted-foreground mb-3">
                  Create a{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                    public/fonts/
                  </code>{" "}
                  directory and add the RaidGuild brand fonts:
                </p>
                <ul className="list-disc list-inside text-body-base text-muted-foreground space-y-1 mb-3">
                  <li>MAZIUSREVIEW20.09-Regular.otf</li>
                  <li>MAZIUSREVIEW20.09-Regular.woff</li>
                  <li>EBGaramond-VariableFont_wght.ttf</li>
                  <li>EBGaramond-Italic-VariableFont_wght.ttf</li>
                </ul>
                <p className="text-body-base text-muted-foreground">
                  Copy{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                    src/lib/fonts.ts
                  </code>{" "}
                  into your project and update your{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                    src/app/layout.tsx
                  </code>{" "}
                  to include the fonts.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <h3 className="type-heading-md mb-4">3. Update Global CSS</h3>
                <p className="text-body-base text-muted-foreground">
                  Replace your{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                    src/app/globals.css
                  </code>{" "}
                  with the RaidGuild brand styles from the globals.css file in
                  this repo.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <h3 className="type-heading-md mb-4">4. Add Components</h3>
                <p className="text-body-base text-muted-foreground mb-3">
                  Copy component files from{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                    src/components/ui/
                  </code>{" "}
                  into your project. Components are built with Radix UI
                  primitives and styled with Tailwind CSS.
                </p>
                <p className="text-body-base text-muted-foreground mb-3">
                  <strong className="text-foreground">Note:</strong> You&apos;ll
                  need to install the corresponding Radix UI packages for each
                  component you use. For example, if you&apos;re using the
                  Switch component, install{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                    @radix-ui/react-switch
                  </code>
                  . Check each component&apos;s imports to see which Radix
                  packages are required.
                </p>
                <p className="text-body-base text-muted-foreground">
                  For detailed installation instructions and examples, see the{" "}
                  <Link
                    href="https://github.com/raid-guild/brand/blob/main/README.md"
                    className="text-primary hover:text-primary/80 transition-colors underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    README on GitHub
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "examples" && (
          <div className="space-y-16">
            <section id="examples-top" className="mb-8">
              <h2 className="type-heading-lg mb-6">Component Examples</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#button"
                    className="text-body-base text-primary hover:text-primary/80 transition-colors underline"
                  >
                    Button
                  </a>
                </li>
                <li>
                  <a
                    href="#switch"
                    className="text-body-base text-primary hover:text-primary/80 transition-colors underline"
                  >
                    Switch
                  </a>
                </li>
              </ul>
            </section>
            <ButtonExample />
            <SwitchExample />
          </div>
        )}
      </div>
    </div>
  );
}
