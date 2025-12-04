import Link from "next/link";
import IllustrationGallery from "@/components/illustrations/IllustrationGallery";

export default function IllustrationsPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="type-display-lg mb-6">Illustrations</h1>
          <p className="text-lg mb-8 text-foreground/80">
            Our illustration library features technology-forward line art that
            echoes cyberpunk aesthetics and D&D heroism. These distinctive
            visuals capture the spirit of Raid Guild—where blockchain meets
            fantasy, and builders become adventurers.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
            <p className="text-base mb-3 font-medium">
              Download all illustration files:
            </p>
            <Link
              href="https://github.com/raid-guild/brand/tree/main/public/assets/webp"
              className="text-lg text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="type-heading-lg mb-6">About the Illustrations</h2>
          <p className="text-base mb-6 text-foreground/70">
            Each illustration is available in both full-color (-c) and black &
            white (-bw) versions. Illustrations are provided in WebP format
            with multiple aspect ratios: 1440x1440 (square), 1080x1440
            (portrait), and 1440x550 (landscape). Use illustrations to enhance
            storytelling and create visual interest. Pair with brand colors
            for cohesive designs. Avoid stretching or distorting artwork—maintain
            original aspect ratios for best results.
          </p>
          <p className="text-base text-foreground/70">
            This is a list of{" "}
            <Link
              href="https://hackmd.io/@Suede/Skbpddppll"
              className="text-primary hover:text-primary/80 transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Midjourney prompts
            </Link>{" "}
            that were used to create these illustrations.
          </p>
        </section>

        {/* Gallery */}
        <section className="mb-16">
          <h2 className="type-heading-lg mb-6">Browse Illustrations</h2>
          <IllustrationGallery />
        </section>
      </div>
    </div>
  );
}
