"use client";

import Link from "next/link";
import React, { useState } from "react";
import { SwitchExample } from "@/components/examples/SwitchExample";
import { ButtonExample } from "@/components/examples/ButtonExample";
import { AccordionExample } from "@/components/examples/AccordionExample";
import { BadgeExample } from "@/components/examples/BadgeExample";
import { BreadcrumbExample } from "@/components/examples/BreadcrumbExample";
import { CalendarExample } from "@/components/examples/CalendarExample";
import { CardExample } from "@/components/examples/CardExample";
import { CarouselExample } from "@/components/examples/CarouselExample";
import { ChartExample } from "@/components/examples/ChartExample";
import { CheckboxExample } from "@/components/examples/CheckboxExample";
import { ComboboxExample } from "@/components/examples/ComboboxExample";
import { CommandExample } from "@/components/examples/CommandExample";
import { DataTableExample } from "@/components/examples/DataTableExample";
import { DatePickerExample } from "@/components/examples/DatePickerExample";
import { DialogExample } from "@/components/examples/DialogExample";
import { DrawerExample } from "@/components/examples/DrawerExample";
import { DropdownMenuExample } from "@/components/examples/DropdownMenuExample";
import { HoverCardExample } from "@/components/examples/HoverCardExample";
import { InputExample } from "@/components/examples/InputExample";
import { ItemExample } from "@/components/examples/ItemExample";
import { KbdExample } from "@/components/examples/KbdExample";
import { MenubarExample } from "@/components/examples/MenubarExample";
import { LabelExample } from "@/components/examples/LabelExample";
import { MultiselectExample } from "@/components/examples/MultiselectExample";
import { NavigationMenuExample } from "@/components/examples/NavigationMenuExample";
import { PaginationExample } from "@/components/examples/PaginationExample";
import { ProgressExample } from "@/components/examples/ProgressExample";
import { RadioGroupExample } from "@/components/examples/RadioGroupExample";
import { ScrollAreaExample } from "@/components/examples/ScrollAreaExample";
import { SelectExample } from "@/components/examples/SelectExample";
import { SheetExample } from "@/components/examples/SheetExample";
import { SidebarExample } from "@/components/examples/SidebarExample";
import { SkeletonExample } from "@/components/examples/SkeletonExample";
import { SliderExample } from "@/components/examples/SliderExample";
import { TableExample } from "@/components/examples/TableExample";
import { TabsExample } from "@/components/examples/TabsExample";
import { TextareaExample } from "@/components/examples/TextareaExample";
import { ToggleExample } from "@/components/examples/ToggleExample";
import { TooltipExample } from "@/components/examples/TooltipExample";

export default function UIPage() {
  const [activeTab, setActiveTab] = useState<"getting-started" | "examples">(
    "getting-started"
  );

  const components = [
    { id: "accordion", label: "Accordion", component: <AccordionExample /> },
    { id: "badge", label: "Badge", component: <BadgeExample /> },
    {
      id: "breadcrumb",
      label: "Breadcrumb",
      component: <BreadcrumbExample />,
    },
    { id: "button", label: "Button", component: <ButtonExample /> },
    { id: "calendar", label: "Calendar", component: <CalendarExample /> },
    { id: "card", label: "Card", component: <CardExample /> },
    { id: "carousel", label: "Carousel", component: <CarouselExample /> },
    { id: "chart", label: "Chart", component: <ChartExample /> },
    { id: "checkbox", label: "Checkbox", component: <CheckboxExample /> },
    { id: "combobox", label: "Combobox", component: <ComboboxExample /> },
    { id: "command", label: "Command", component: <CommandExample /> },
    {
      id: "data-table",
      label: "Data Table",
      component: <DataTableExample />,
    },
    {
      id: "date-picker",
      label: "Date Picker",
      component: <DatePickerExample />,
    },
    { id: "dialog", label: "Dialog", component: <DialogExample /> },
    { id: "drawer", label: "Drawer", component: <DrawerExample /> },
    {
      id: "dropdown-menu",
      label: "Dropdown Menu",
      component: <DropdownMenuExample />,
    },
    {
      id: "hover-card",
      label: "Hover Card",
      component: <HoverCardExample />,
    },
    { id: "input", label: "Input", component: <InputExample /> },
    { id: "item", label: "Item", component: <ItemExample /> },
    { id: "kbd", label: "Kbd", component: <KbdExample /> },
    { id: "label", label: "Label", component: <LabelExample /> },
    { id: "menubar", label: "Menubar", component: <MenubarExample /> },
    {
      id: "multiselect",
      label: "Multiselect",
      component: <MultiselectExample />,
    },
    {
      id: "navigation-menu",
      label: "Navigation Menu",
      component: <NavigationMenuExample />,
    },
    { id: "pagination", label: "Pagination", component: <PaginationExample /> },
    { id: "progress", label: "Progress", component: <ProgressExample /> },
    {
      id: "radio-group",
      label: "Radio Group",
      component: <RadioGroupExample />,
    },
    {
      id: "scroll-area",
      label: "Scroll Area",
      component: <ScrollAreaExample />,
    },
    { id: "select", label: "Select", component: <SelectExample /> },
    { id: "sheet", label: "Sheet", component: <SheetExample /> },
    { id: "sidebar", label: "Sidebar", component: <SidebarExample /> },
    { id: "skeleton", label: "Skeleton", component: <SkeletonExample /> },
    { id: "slider", label: "Slider", component: <SliderExample /> },
    { id: "switch", label: "Switch", component: <SwitchExample /> },
    { id: "table", label: "Table", component: <TableExample /> },
    { id: "tabs", label: "Tabs", component: <TabsExample /> },
    { id: "textarea", label: "Textarea", component: <TextareaExample /> },
    { id: "toggle", label: "Toggle", component: <ToggleExample /> },
    { id: "tooltip", label: "Tooltip", component: <TooltipExample /> },
  ] as const;

  type ComponentId = (typeof components)[number]["id"];

  const [selectedComponent, setSelectedComponent] =
    useState<ComponentId | null>(null);

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

              <div className="p-6 border border-border rounded-lg bg-primary/5">
                <h3 className="type-heading-md mb-4">
                  5. Using with LLM Developer Agents
                </h3>
                <p className="text-body-base text-muted-foreground mb-4">
                  When working with LLM developer agents (Cursor, GitHub Copilot,
                  ChatGPT, etc.), always include the{" "}
                  <strong className="text-foreground">
                    UI Components Catalog
                  </strong>{" "}
                  in your prompt context. This ensures the agent knows what
                  components are available and will use them instead of creating
                  custom alternatives.
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="type-body-lg font-semibold mb-2">
                      📄 Component Catalog Location
                    </h4>
                    <p className="text-body-base text-muted-foreground mb-2">
                      The complete catalog is available at:
                    </p>
                    <code className="block bg-muted p-3 rounded-lg text-sm">
                      docs/ui-components.md
                    </code>
                  </div>
                  <div>
                    <h4 className="type-body-lg font-semibold mb-2">
                      💡 Example Prompt Template
                    </h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`I need to build a [feature description].

Please use components from the UI Components Catalog 
(docs/ui-components.md). Always prefer existing components 
over creating custom ones.

Requirements:
- [Requirement 1]
- [Requirement 2]

Make sure to:
- Import from @/components/ui/[component-name]
- Follow design system patterns
- Use correct variants and props`}</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="type-body-lg font-semibold mb-2">
                      ✅ Best Practices
                    </h4>
                    <ul className="list-disc list-inside text-body-base text-muted-foreground space-y-1">
                      <li>
                        Add the catalog document to your prompt context at the
                        start of each session
                      </li>
                      <li>
                        Reference specific components when asking for features
                      </li>
                      <li>
                        Verify the agent is using existing components before
                        accepting code
                      </li>
                      <li>
                        Check the catalog for component combinations and patterns
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-body-base text-muted-foreground">
                  The catalog includes detailed descriptions, usage examples,
                  design tokens, and common patterns for all 42+ available
                  components.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "examples" && (
          <div className="space-y-16">
            <section id="examples-top" className="mb-8">
              <h2 className="type-heading-lg mb-6">Component Examples</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {components.map((component) => (
                  <li key={component.id}>
                    <button
                      onClick={() => setSelectedComponent(component.id)}
                      className="text-body-base text-primary hover:text-primary/80 transition-colors underline text-left"
                    >
                      {component.label}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
            {selectedComponent && (
              <div className="mt-8">
                {components.find((c) => c.id === selectedComponent)?.component}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
