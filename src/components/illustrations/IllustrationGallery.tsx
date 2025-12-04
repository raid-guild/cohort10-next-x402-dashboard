"use client";

import { useState } from "react";
import Image from "next/image";

type IllustrationVariant = "color" | "bw";
type IllustrationSize = "1440x1440" | "1080x1440" | "1440x550";

interface Illustration {
  name: string;
  displayName: string;
  sizes: IllustrationSize[];
}

const illustrations: Illustration[] = [
  { name: "castle-flag", displayName: "Castle Flag", sizes: ["1440x1440"] },
  { name: "castle-staff", displayName: "Castle Staff", sizes: ["1440x1440"] },
  { name: "desk-work", displayName: "Desk Work", sizes: ["1440x1440"] },
  { name: "forge-anvil", displayName: "Forge Anvil", sizes: ["1440x1440"] },
  { name: "forge-building", displayName: "Forge Building", sizes: ["1440x1440"] },
  { name: "forge-duo", displayName: "Forge Duo", sizes: ["1440x1440"] },
  { name: "forge-fire", displayName: "Forge Fire", sizes: ["1440x1440"] },
  { name: "forge-work", displayName: "Forge Work", sizes: ["1440x1440"] },
  { name: "portal-arch", displayName: "Portal Arch", sizes: ["1440x1440"] },
  { name: "ravens-flight", displayName: "Ravens Flight", sizes: ["1440x1440"] },
  { name: "stairs-spiral", displayName: "Stairs Spiral", sizes: ["1440x1440"] },
  { name: "stone-monuments", displayName: "Stone Monuments", sizes: ["1440x1440"] },
  { name: "table-castle", displayName: "Table Castle", sizes: ["1440x1440"] },
  { name: "tree-mech", displayName: "Tree Mech", sizes: ["1440x1440"] },
  { name: "trio-arch", displayName: "Trio Arch", sizes: ["1440x1440"] },
  { name: "trio-backs", displayName: "Trio Backs", sizes: ["1440x1440"] },
  { name: "trio-beast", displayName: "Trio Beast", sizes: ["1440x1440"] },
  { name: "trio-mountain", displayName: "Trio Mountain", sizes: ["1440x1440"] },
  { name: "trio-orb", displayName: "Trio Orb", sizes: ["1440x1440"] },
  { name: "trio-portal", displayName: "Trio Portal", sizes: ["1440x1440"] },
  { name: "trio-portraits", displayName: "Trio Portraits", sizes: ["1440x1440"] },
  { name: "trio-profiles", displayName: "Trio Profiles", sizes: ["1440x1440"] },
  { name: "trio-warriors", displayName: "Trio Warriors", sizes: ["1440x1440"] },
  { name: "trio-weapons", displayName: "Trio Weapons", sizes: ["1440x1440"] },
  { name: "trio-wings", displayName: "Trio Wings", sizes: ["1440x1440"] },
  { name: "warrior-solo", displayName: "Warrior Solo", sizes: ["1440x1440"] },
  { name: "warriors-armed", displayName: "Warriors Armed", sizes: ["1440x1440"] },
  { name: "warriors-belts", displayName: "Warriors Belts", sizes: ["1440x1440"] },
  { name: "warriors-casual", displayName: "Warriors Casual", sizes: ["1440x1440"] },
  { name: "warriors-confident", displayName: "Warriors Confident", sizes: ["1440x1440"] },
  { name: "warriors-forward", displayName: "Warriors Forward", sizes: ["1440x1440"] },
  { name: "warriors-magic", displayName: "Warriors Magic", sizes: ["1440x1440"] },
  { name: "warriors-masked", displayName: "Warriors Masked", sizes: ["1440x1440"] },
  { name: "warriors-moloch", displayName: "Warriors Moloch", sizes: ["1440x1440"] },
  { name: "warriors-orbs", displayName: "Warriors Orbs", sizes: ["1440x1440"] },
  { name: "warriors-ready", displayName: "Warriors Ready", sizes: ["1440x1440"] },
  { name: "warriors-standing", displayName: "Warriors Standing", sizes: ["1440x1440"] },
  { name: "warriors-triangle", displayName: "Warriors Triangle", sizes: ["1440x1440"] },
  { name: "warriors-white", displayName: "Warriors White", sizes: ["1440x1440"] },
  { name: "arch-gate", displayName: "Arch Gate", sizes: ["1080x1440"] },
  { name: "book-orb", displayName: "Book Orb", sizes: ["1080x1440"] },
  { name: "compass-circular", displayName: "Compass Circular", sizes: ["1080x1440"] },
  { name: "raven-solo", displayName: "Raven Solo", sizes: ["1080x1440"] },
  { name: "stairs-cloud", displayName: "Stairs Cloud", sizes: ["1080x1440"] },
  { name: "stairs-curve", displayName: "Stairs Curve", sizes: ["1080x1440"] },
  { name: "stairs-twist", displayName: "Stairs Twist", sizes: ["1080x1440"] },
  { name: "stone-pedestal", displayName: "Stone Pedestal", sizes: ["1080x1440"] },
  { name: "tower-floating", displayName: "Tower Floating", sizes: ["1080x1440"] },
  { name: "tower-platform", displayName: "Tower Platform", sizes: ["1080x1440"] },
  { name: "tower-tree", displayName: "Tower Tree", sizes: ["1080x1440"] },
  { name: "tree-island", displayName: "Tree Island", sizes: ["1080x1440"] },
  { name: "ship-front", displayName: "Ship Front", sizes: ["1440x550"] },
  { name: "ship-mech", displayName: "Ship Mech", sizes: ["1440x550"] },
];

export default function IllustrationGallery() {
  const [selectedIllustration, setSelectedIllustration] = useState(
    illustrations[0]
  );
  const [variant, setVariant] = useState<IllustrationVariant>("color");
  const [size, setSize] = useState<IllustrationSize>("1440x1440");

  const getImagePath = (
    name: string,
    variant: IllustrationVariant,
    size: IllustrationSize,
    isThumbnail = false
  ) => {
    const suffix = variant === "color" ? "-c" : "-bw";
    const folder = isThumbnail ? `thumbnails/${size}` : size;
    return `/assets/webp/${folder}/${name}${suffix}.webp`;
  };

  const filteredIllustrations = illustrations.filter((ill) =>
    ill.sizes.includes(size)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[900px]">
      {/* Main Preview Area - Left */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Variant Toggle */}
          <div className="flex gap-2 border border-border rounded-lg p-1">
            <button
              onClick={() => setVariant("color")}
              className={`px-4 py-2 rounded type-body-sm transition-colors ${
                variant === "color"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Color
            </button>
            <button
              onClick={() => setVariant("bw")}
              className={`px-4 py-2 rounded type-body-sm transition-colors ${
                variant === "bw"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Black & White
            </button>
          </div>

          {/* Size Filter */}
          <div className="flex gap-2 border border-border rounded-lg p-1">
            <button
              onClick={() => setSize("1440x1440")}
              className={`px-4 py-2 rounded type-body-sm transition-colors ${
                size === "1440x1440"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Square
            </button>
            <button
              onClick={() => setSize("1080x1440")}
              className={`px-4 py-2 rounded type-body-sm transition-colors ${
                size === "1080x1440"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Portrait
            </button>
            <button
              onClick={() => setSize("1440x550")}
              className={`px-4 py-2 rounded type-body-sm transition-colors ${
                size === "1440x550"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Landscape
            </button>
          </div>
        </div>

        {/* Large Preview */}
        <div className="flex-1 border border-border rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center p-8">
          <div className="relative w-full h-full">
            <Image
              src={getImagePath(
                selectedIllustration.name,
                variant,
                size,
                false
              )}
              alt={selectedIllustration.displayName}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Image Info */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="type-heading-sm">
              {selectedIllustration.displayName}
            </h3>
            <p className="type-body-sm text-muted-foreground">
              {size} • {variant === "color" ? "Full Color" : "Black & White"}
            </p>
          </div>
          <a
            href={getImagePath(selectedIllustration.name, variant, size, false)}
            download
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors type-body-sm"
          >
            Download
          </a>
        </div>
      </div>

      {/* Thumbnail Sidebar - Right */}
      <div className="w-full lg:w-auto overflow-hidden">
        <div className="h-full overflow-y-auto space-y-2">
          {filteredIllustrations.map((illustration) => (
            <button
              key={illustration.name}
              onClick={() => setSelectedIllustration(illustration)}
              className={`w-1/2 flex items-center justify-center overflow-hidden rounded-lg border transition-all ${
                selectedIllustration.name === illustration.name
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={getImagePath(illustration.name, variant, size, true)}
                alt={illustration.displayName}
                width={208}
                height={208}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
