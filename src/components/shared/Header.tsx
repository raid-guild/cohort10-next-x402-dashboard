"use client";

import Link from "next/link";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/theme-context";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-moloch-400">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logos/Logotype.svg"
              alt="Raid Guild"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground">Light</span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
              <span className="text-sm text-foreground">Dark</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
