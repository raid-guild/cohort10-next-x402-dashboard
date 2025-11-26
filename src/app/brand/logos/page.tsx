import Image from "next/image";
import Link from "next/link";

export default function LogosPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="type-display-lg mb-6">Logos</h1>
          <p className="text-lg mb-8 text-foreground/80">
            The logo is the primary identifier for our brand. It is comprised of
            two elements, the crossed sword logomark and the Raid Guild
            logotype.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
            <p className="text-base mb-3 font-medium">
              Download all logo files:
            </p>
            <Link
              href="https://github.com/raid-guild/brand/tree/main/public/assets/logos"
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

        <div className="space-y-16">
          <section>
            <h2 className="type-heading-lg mb-6">Logotype</h2>
            <p className="text-base mb-6 text-foreground/70">
              The full logotype combines the logomark with the &quot;Raid
              Guild&quot; wordmark.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden border border-border">
                <Image
                  src="/assets/logos/full-m500-m800.svg"
                  alt="Raid Guild Logotype on Moloch 500 background"
                  width={598}
                  height={335}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-lg overflow-hidden border border-border">
                <Image
                  src="/assets/logos/full-s100-s700.svg"
                  alt="Raid Guild Logotype on Scroll 100 background"
                  width={598}
                  height={335}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="type-heading-lg mb-6">Logomark</h2>
            <p className="text-base mb-6 text-foreground/70">
              The crossed sword logomark can be used independently when space is
              limited or when the full logotype is not appropriate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden border border-border">
                <Image
                  src="/assets/logos/symbol-m500.svg"
                  alt="Raid Guild Logomark on Moloch 500 background"
                  width={112}
                  height={105}
                  className="w-full h-auto max-w-xs mx-auto"
                />
              </div>
              <div className="rounded-lg overflow-hidden border border-border">
                <Image
                  src="/assets/logos/symbol-m800-s100.svg"
                  alt="Raid Guild Logomark on Moloch 800 background"
                  width={300}
                  height={300}
                  className="w-full h-auto max-w-xs mx-auto"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
