import Link from "next/link";

export default function Home() {
  return (
    <div className="container-custom py-16">
      <div className="mx-auto">
        <h1 className="text-display-lg mb-8">Raid Guild Brand Guidelines</h1>

        <div className="space-y-6">
          <h2 className="text-heading-lg text-moloch-500 mb-8">Resources</h2>
        </div>

        <div className="space-y-4 text-body-lg">
          <Link
            href="/assets/RaidGuild_brand_guidelines.pdf"
            className="block hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="text-heading-sm">Brand Guidelines (PDF)</h3>
          </Link>

          <Link
            href="https://www.figma.com/proto/EuaqswLG9HfWWPbgNOdbSO/Raid-Guild-%7C-Brand-Refresh-%7C-Q4-2024?node-id=1859-175&t=0RNzFwba5kAxTnCR-1"
            className="block hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="text-heading-sm">Brand Guidelines (Figma)</h3>
          </Link>

          <Link
            href="https://github.com/raid-guild/brand"
            className="block hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="text-heading-sm">GitHub Repository</h3>
          </Link>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-heading-lg">Guidelines</h2>

        <div className="space-y-4">
          <Link
            href="/logos"
            className="block hover:text-accent transition-colors"
          >
            <h3 className="text-heading-sm">Logos</h3>
          </Link>

          <Link
            href="/colors"
            className="block hover:text-accent transition-colors"
          >
            <h3 className="text-heading-sm">Colors</h3>
          </Link>

          <Link
            href="/typography"
            className="block hover:text-accent transition-colors"
          >
            <h3 className="text-heading-sm">Typography</h3>
          </Link>

          <Link
            href="/ui"
            className="block hover:text-accent transition-colors"
          >
            <h3 className="text-heading-sm">UI Components</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
