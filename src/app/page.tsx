"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGES = [
  "/assets/webp/1080x1440/tower-platform-c.webp",
  "/assets/webp/1080x1440/stairs-twist-c.webp",
  "/assets/webp/1080x1440/stairs-curve-c.webp",
  "/assets/webp/1080x1440/stairs-cloud-c.webp",
  "/assets/webp/1080x1440/book-orb-c.webp",
  "/assets/webp/1080x1440/tree-island-c.webp",
  "/assets/webp/1080x1440/arch-gate-c.webp",
  "/assets/webp/1080x1440/tower-floating-c.webp",
  "/assets/webp/1080x1440/tower-tree-c.webp",
  "/assets/webp/1080x1440/compass-circular-c.webp",
  "/assets/webp/1080x1440/stone-pedestal-c.webp",
  "/assets/webp/1080x1440/raven-solo-c.webp",
  "/assets/webp/1440x1440/castle-staff-c.webp",
  "/assets/webp/1440x1440/castle-flag-c.webp",
  "/assets/webp/1440x1440/warriors-moloch-c.webp",
  "/assets/webp/1440x1440/stairs-spiral-c.webp",
  "/assets/webp/1440x1440/forge-duo-c.webp",
  "/assets/webp/1440x1440/forge-anvil-c.webp",
  "/assets/webp/1440x1440/forge-work-c.webp",
  "/assets/webp/1440x1440/forge-fire-c.webp",
  "/assets/webp/1440x1440/trio-portraits-c.webp",
  "/assets/webp/1440x1440/ravens-flight-c.webp",
  "/assets/webp/1440x1440/desk-work-c.webp",
  "/assets/webp/1440x1440/warrior-solo-c.webp",
  "/assets/webp/1440x1440/trio-profiles-c.webp",
  "/assets/webp/1440x1440/stone-monuments-c.webp",
  "/assets/webp/1440x1440/tree-mech-c.webp",
  "/assets/webp/1440x1440/portal-arch-c.webp",
  "/assets/webp/1440x1440/forge-building-c.webp",
  "/assets/webp/1440x1440/table-castle-c.webp",
  "/assets/webp/1440x1440/trio-arch-c.webp",
  "/assets/webp/1440x1440/trio-backs-c.webp",
  "/assets/webp/1440x1440/trio-beast-c.webp",
  "/assets/webp/1440x1440/trio-wings-c.webp",
  "/assets/webp/1440x1440/trio-mountain-c.webp",
  "/assets/webp/1440x1440/trio-orb-c.webp",
  "/assets/webp/1440x1440/trio-portal-c.webp",
  "/assets/webp/1440x1440/trio-weapons-c.webp",
  "/assets/webp/1440x1440/warriors-triangle-c.webp",
  "/assets/webp/1440x1440/warriors-confident-c.webp",
  "/assets/webp/1440x1440/warriors-forward-c.webp",
  "/assets/webp/1440x1440/warriors-casual-c.webp",
  "/assets/webp/1440x1440/warriors-orbs-c.webp",
  "/assets/webp/1440x1440/warriors-magic-c.webp",
  "/assets/webp/1440x1440/warriors-white-c.webp",
  "/assets/webp/1440x1440/warriors-ready-c.webp",
  "/assets/webp/1440x1440/warriors-belts-c.webp",
  "/assets/webp/1440x1440/warriors-standing-c.webp",
  "/assets/webp/1440x1440/warriors-masked-c.webp",
  "/assets/webp/1440x1440/warriors-armed-c.webp",
  "/assets/webp/1440x1440/trio-warriors-c.webp",
  "/assets/webp/1080x1440/tower-platform-bw.webp",
  "/assets/webp/1080x1440/stairs-twist-bw.webp",
  "/assets/webp/1080x1440/stairs-curve-bw.webp",
  "/assets/webp/1080x1440/stairs-cloud-bw.webp",
  "/assets/webp/1080x1440/book-orb-bw.webp",
  "/assets/webp/1080x1440/tree-island-bw.webp",
  "/assets/webp/1080x1440/arch-gate-bw.webp",
  "/assets/webp/1080x1440/tower-floating-bw.webp",
  "/assets/webp/1080x1440/tower-tree-bw.webp",
  "/assets/webp/1080x1440/compass-circular-bw.webp",
  "/assets/webp/1080x1440/stone-pedestal-bw.webp",
  "/assets/webp/1080x1440/raven-solo-bw.webp",
  "/assets/webp/1440x1440/castle-flag-bw.webp",
  "/assets/webp/1440x1440/castle-staff-bw.webp",
  "/assets/webp/1440x1440/warriors-moloch-bw.webp",
  "/assets/webp/1440x1440/stairs-spiral-bw.webp",
  "/assets/webp/1440x1440/forge-duo-bw.webp",
  "/assets/webp/1440x1440/forge-anvil-bw.webp",
  "/assets/webp/1440x1440/forge-work-bw.webp",
  "/assets/webp/1440x1440/forge-fire-bw.webp",
  "/assets/webp/1440x1440/trio-portraits-bw.webp",
  "/assets/webp/1440x1440/ravens-flight-bw.webp",
  "/assets/webp/1440x1440/desk-work-bw.webp",
  "/assets/webp/1440x1440/warrior-solo-bw.webp",
  "/assets/webp/1440x1440/trio-profiles-bw.webp",
  "/assets/webp/1440x1440/stone-monuments-bw.webp",
  "/assets/webp/1440x1440/tree-mech-bw.webp",
  "/assets/webp/1440x1440/portal-arch-bw.webp",
  "/assets/webp/1440x1440/forge-building-bw.webp",
  "/assets/webp/1440x1440/table-castle-bw.webp",
  "/assets/webp/1440x1440/trio-arch-bw.webp",
  "/assets/webp/1440x1440/trio-backs-bw.webp",
  "/assets/webp/1440x1440/trio-beast-bw.webp",
  "/assets/webp/1440x1440/trio-wings-bw.webp",
  "/assets/webp/1440x1440/trio-mountain-bw.webp",
  "/assets/webp/1440x1440/trio-orb-bw.webp",
  "/assets/webp/1440x1440/trio-portal-bw.webp",
  "/assets/webp/1440x1440/trio-weapons-bw.webp",
  "/assets/webp/1440x1440/trio-warriors-bw.webp",
  "/assets/webp/1440x1440/warriors-triangle-bw.webp",
  "/assets/webp/1440x1440/warriors-confident-bw.webp",
  "/assets/webp/1440x1440/warriors-forward-bw.webp",
  "/assets/webp/1440x1440/warriors-casual-bw.webp",
  "/assets/webp/1440x1440/warriors-orbs-bw.webp",
  "/assets/webp/1440x1440/warriors-magic-bw.webp",
  "/assets/webp/1440x1440/warriors-white-bw.webp",
  "/assets/webp/1440x1440/warriors-ready-bw.webp",
  "/assets/webp/1440x1440/warriors-belts-bw.webp",
  "/assets/webp/1440x1440/warriors-standing-bw.webp",
  "/assets/webp/1440x1440/warriors-masked-bw.webp",
  "/assets/webp/1440x1440/warriors-armed-bw.webp",
];

export default function Home() {
  // Calculate current image based on 2-minute intervals
  const getImageForInterval = useCallback(() => {
    const interval = Math.floor(Date.now() / (1000 * 60 * 2)); // 2 minutes
    return HERO_IMAGES[interval % HERO_IMAGES.length];
  }, []);

  const [currentImage, setCurrentImage] = useState<string>(getImageForInterval);

  // Update image every minute to catch 2-minute boundaries
  useEffect(() => {
    const checkImage = () => {
      const newImage = getImageForInterval();
      if (newImage !== currentImage) {
        setCurrentImage(newImage);
      }
    };

    const intervalId = setInterval(checkImage, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [currentImage, getImageForInterval]);

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
        <div className="flex justify-center lg:justify-end lg:pr-[100px] lg:pt-[20px]">
          <div className="relative w-full lg:max-w-[500px] aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              key={currentImage}
              src={currentImage}
              alt="Raid Guild Brand Artwork"
              fill
              className="object-contain"
              priority
            />
          </div>
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

              <Link
                href="/illustrations"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Illustrations
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Technology-forward line art library echoing cyberpunk and D&D heroism
                </p>
              </Link>

              <Link
                href="/iconography"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Iconography
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Magical mystical symbols paired with practical development and community icons
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
