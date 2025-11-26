import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container-custom">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center">
          <h1 className="type-display-lg md:type-display-md mb-4">
            Raid Guild Brand Guidelines
          </h1>
          <p className="type-body-lg text-moloch-800">
            Your one-stop shop for brand assets, design guidelines, and UI
            components. Everything you need to build with the Raid Guild brand.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
          <Image
            src="/assets/webp/1080x1440/tower-platform-c.webp"
            alt="Raid Guild Brand Artwork"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Quick Resources */}
        <section className="mb-16">
          <h2 className="type-heading-lg text-moloch-500 mb-6">
            Quick Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/assets/RaidGuild_brand_guidelines.pdf"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Brand Guidelines (PDF)
              </h3>
              <p className="type-body-sm text-muted-foreground">
                Download the complete brand guidelines document
              </p>
            </Link>

            <Link
              href="https://www.figma.com/design/i12YX9sbqeBXFJvExzA5PM/Raid-Guild-%7C-FINAL-%7C-Brand-%7C-Website-%7C-Archive-%7C-Q4-2025?node-id=1859-175&p=f&t=hEppjEwjbW1ZjeF0-0"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Brand Guidelines (Figma)
              </h3>
              <p className="type-body-sm text-muted-foreground">
                View and use brand assets in Figma
              </p>
            </Link>

            <Link
              href="https://github.com/raid-guild/brand"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                GitHub Repository
              </h3>
              <p className="type-body-sm text-muted-foreground">
                Find Tailwind CSS setup and shadcn/ui components
              </p>
            </Link>
          </div>
        </section>

        {/* For Designers & Developers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* For Designers */}
          <section>
            <h2 className="type-heading-lg text-moloch-500 mb-6">
              For Archers
            </h2>
            <p className="text-body-base text-muted-foreground mb-6">
              Find all the brand assets, logos, colors, and typography you need
              for your designs.
            </p>
            <div className="space-y-4">
              <Link
                href="/logos"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Logos
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Primary logos, logomarks, and variations in multiple formats
                </p>
              </Link>

              <Link
                href="/colors"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Colors
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Complete color palette with Moloch and Scroll color scales
                </p>
              </Link>

              <Link
                href="/typography"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Typography
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Font families, styles, and typography scale
                </p>
              </Link>
            </div>
          </section>

          {/* For Developers */}
          <section>
            <h2 className="type-heading-lg text-moloch-500 mb-6">
              For Warriors
            </h2>
            <p className="text-body-base text-muted-foreground mb-6">
              Get style guidelines, UI components, and code examples to build
              consistent web applications.
            </p>
            <div className="space-y-4">
              <Link
                href="/ui"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  UI Components
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Interactive component examples with documentation and usage
                  guidelines
                </p>
              </Link>

              <Link
                href="/colors"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Color Tokens
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  CSS variables and Tailwind classes for all brand colors
                </p>
              </Link>

              <Link
                href="/typography"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Typography Classes
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Ready-to-use typography utility classes for your components
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
