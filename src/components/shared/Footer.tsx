"use client";

import Link from "next/link";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/theme-context";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <p className="type-body-sm text-muted-foreground">
            Raid Guild Brand Guidelines
          </p>
          <div className="flex items-center gap-6">
            <div className="type-body-sm text-muted-foreground">
              <Link
                href="https://github.com/raid-guild/brand"
                className="text-primary hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </div>
            <div className="flex items-center gap-2 type-body-sm text-muted-foreground">
              <span className="text-muted-foreground/80">Light</span>
              <Switch
                aria-label="Toggle theme"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
              <span className="text-muted-foreground/80">Dark</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
