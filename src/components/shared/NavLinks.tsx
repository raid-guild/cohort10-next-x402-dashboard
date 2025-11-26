import Link from "next/link";

export type HeaderNavLink = {
  label: string;
  href: string;
  type: "router" | "anchor";
  anchorId?: string | null;
};

type NavLinksTheme = {
  navHover: string;
  navActive: string;
  navActiveText: string;
};

export type HeaderNavLinksProps = {
  theme: NavLinksTheme;
  activeAnchorId: string | null;
  variant: "desktop" | "mobile";
  links: HeaderNavLink[];
  onLinkClick?: () => void;
};

export default function HeaderNavLinks({
  theme,
  activeAnchorId,
  variant,
  links,
  onLinkClick,
}: HeaderNavLinksProps) {
  return (
    <nav
      className={[
        "flex items-center transition-all duration-200 motion-reduce:transition-none",
        variant === "desktop"
          ? "flex-wrap justify-end text-sm uppercase tracking-[0.1em] gap-5"
          : "flex-col items-stretch gap-3 text-base font-semibold uppercase tracking-[0.25em]",
      ].join(" ")}
    >
      {links.map(({ label, href, type, anchorId }) => {
        const isActive =
          Boolean(activeAnchorId) && anchorId === activeAnchorId ? true : false;
        const classes = [
          "type-label-md rounded-md px-8 py-1 text-center transition-colors duration-200 motion-reduce:transition-none",
          theme.navHover,
          isActive ? theme.navActive : "",
          isActive ? theme.navActiveText : "",
        ].join(" ");

        if (type === "router") {
          return (
            <Link
              key={`${label}-${href}`}
              href={href}
              className={classes}
              onClick={onLinkClick}
            >
              {label}
            </Link>
          );
        }

        return (
          <a
            key={`${label}-${href}`}
            href={href}
            className={classes}
            onClick={onLinkClick}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}

