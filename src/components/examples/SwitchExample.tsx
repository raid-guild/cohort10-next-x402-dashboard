"use client";

import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function SwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <section id="switch">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Switch</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/switch.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/SwitchExample.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example code →
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Basic Switch</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="example-switch"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <label
              htmlFor="example-switch"
              className="text-body-base cursor-pointer"
            >
              Toggle switch
            </label>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Disabled Switch</h3>
          <div className="flex items-center space-x-2">
            <Switch id="disabled-switch" disabled />
            <label
              htmlFor="disabled-switch"
              className="text-body-base text-muted-foreground"
            >
              Disabled switch
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
