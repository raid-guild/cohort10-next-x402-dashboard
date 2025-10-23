import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <p className="text-body-sm text-muted-foreground">
            Raid Guild Brand Guidelines
          </p>
          <Link
            href="https://github.com/raid-guild/brand"
            className="text-body-sm text-primary hover:text-primary/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
