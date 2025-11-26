import Image from "next/image";
import Link from "next/link";

export default function BrandPage() {
  return (
    <div className="container-custom">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center">
          <h1 className="type-display-lg md:type-display-md mb-4">Brand</h1>
          <p className="type-body-lg text-moloch-800">
            Explore the Raid Guild brand identity. Find logos, colors, and
            typography that define our visual language and help you create
            consistent, on-brand designs.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
          <Image
            src="/assets/webp/1080x1440/tree-island-c.webp"
            alt="Raid Guild Brand Artwork"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Brand Pages */}
        <section className="mb-16">
          <h2 className="type-heading-lg text-moloch-500 mb-6">Brand Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/brand/logos"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Logos
              </h3>
              <p className="type-body-sm text-muted-foreground">
                Primary logos, logomarks, and variations in multiple formats
              </p>
            </Link>

            <Link
              href="/brand/colors"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Colors
              </h3>
              <p className="type-body-sm text-muted-foreground">
                Complete color palette with Moloch and Scroll color scales
              </p>
            </Link>

            <Link
              href="/brand/typography"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
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
      </div>
    </div>
  );
}
