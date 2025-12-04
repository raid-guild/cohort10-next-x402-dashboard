"use client";

import {
  ComponentType,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import HeaderNavLinks, {
  type HeaderNavLink,
  type HeaderNavLinksProps,
} from "./NavLinks";

type HeaderTheme = "moloch-500" | "moloch-800" | "scroll-700";

type ThemeConfig = {
  background: string;
  borderAccent: string;
  text: string;
  navHover: string;
  navActive: string;
  navActiveText: string;
  menuSurface: string;
  logoPath: string;
};

type NavItemWithHref = { label: string; href: string; anchor?: undefined; isExternal?: boolean };
type NavItemWithAnchor = { label: string; anchor: string; href?: undefined; isExternal?: boolean };
type NavItem = NavItemWithHref | NavItemWithAnchor;

const NAV_ITEMS: NavItem[] = [
  { label: "Brand Guide", href: "/" },
  { label: "RaidGuild.org", href: "https://www.raidguild.org/", isExternal: true },
];

const THEME_CONFIG: Record<HeaderTheme, ThemeConfig> = {
  "moloch-500": {
    background: "bg-moloch-500",
    borderAccent: "border-scroll-700",
    text: "text-scroll-100",
    navHover: "hover:bg-moloch-800",
    navActive: "bg-moloch-800",
    navActiveText: "text-scroll-100",
    menuSurface: "bg-moloch-500",
    logoPath: "/assets/logos/full-m800.svg",
  },
  "moloch-800": {
    background: "bg-moloch-800",
    borderAccent: "border-moloch-500",
    text: "text-scroll-100",
    navHover: "hover:bg-moloch-500",
    navActive: "bg-moloch-500",
    navActiveText: "text-scroll-100",
    menuSurface: "bg-moloch-800/95",
    logoPath: "/assets/logos/full-m500.svg",
  },
  "scroll-700": {
    background: "bg-scroll-700",
    borderAccent: "border-moloch-800",
    text: "text-scroll-100",
    navHover: "hover:bg-moloch-800",
    navActive: "bg-moloch-800",
    navActiveText: "text-scroll-100",
    menuSurface: "bg-scroll-700",
    logoPath: "/assets/logos/full-s100.svg",
  },
};

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";
const DESKTOP_THIN_HEIGHT = 96;
const MOBILE_HEADER_HEIGHT = 72;

type HeaderNavLinksComponent = ComponentType<HeaderNavLinksProps>;

type HeaderProps = {
  /**
   * When enabled, use standard navigation links instead of smooth scrolling.
   */
  staticAppearance?: boolean;
  themeVariant?: HeaderTheme;
  NavLinksComponent?: HeaderNavLinksComponent;
};

export default function Header({
  staticAppearance = true,
  themeVariant = "moloch-500",
  NavLinksComponent: ProvidedNavLinksComponent,
}: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const isDesktop = useIsDesktop();

  const headerHeight = isDesktop ? DESKTOP_THIN_HEIGHT : MOBILE_HEADER_HEIGHT;

  // Calculate theme based on 5-minute intervals
  const getThemeForInterval = useCallback(() => {
    const themes: HeaderTheme[] = ["moloch-500", "moloch-800", "scroll-700"];
    const interval = Math.floor(Date.now() / (1000 * 60 * 5)); // 5 minutes
    return themes[interval % themes.length];
  }, []);

  const [currentTheme, setCurrentTheme] = useState<HeaderTheme>(getThemeForInterval);

  // Update theme every minute to catch 5-minute boundaries
  useEffect(() => {
    const checkTheme = () => {
      const newTheme = getThemeForInterval();
      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme);
      }
    };

    const intervalId = setInterval(checkTheme, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [currentTheme, getThemeForInterval]);

  const navAnchorIds = useMemo(
    () =>
      NAV_ITEMS.map((item) => getAnchorId(item)).filter(
        (value): value is string => Boolean(value)
      ),
    []
  );

  const theme = THEME_CONFIG[currentTheme];
  const NavLinksComponent = ProvidedNavLinksComponent ?? HeaderNavLinks;

  const navLinks = useMemo<HeaderNavLink[]>(
    () =>
      NAV_ITEMS.map((item) => {
        const anchorId = getAnchorId(item);
        const anchorHref = anchorId ? `#${anchorId}` : undefined;
        const routerHref =
          "href" in item && typeof item.href === "string"
            ? item.href
            : anchorHref ?? "#";
        const anchorTarget = anchorHref ?? routerHref;

        return {
          label: item.label,
          href: staticAppearance ? routerHref : anchorTarget,
          type: staticAppearance ? "router" : "anchor",
          anchorId,
          isExternal: item.isExternal,
        };
      }),
    [staticAppearance]
  );

  const activeAnchorId = useActiveAnchor({
    enabled: !staticAppearance,
    headerHeight,
    navAnchorIds,
  });

  const mobileMenu = useMobileMenu({
    panelRef,
    triggerRef,
  });

  return (
    <header
      ref={headerRef}
      className={[
        "sticky top-0 z-50 border-t-[10px] border-b-2 border-b-scroll-100 transition-colors duration-500 motion-reduce:transition-none",
        theme.background,
        theme.borderAccent,
        theme.text,
      ].join(" ")}
    >
      <div className="container-custom">
        <div className="hidden lg:block">
          <HeaderDesktop
            theme={theme}
            activeAnchorId={activeAnchorId}
            NavLinksComponent={NavLinksComponent}
            links={navLinks}
          />
        </div>

        <div className="lg:hidden">
          <HeaderMobile
            theme={theme}
            isMenuOpen={mobileMenu.isOpen}
            panelId={panelId}
            onToggleMenu={mobileMenu.toggle}
            triggerRef={triggerRef}
          />
          <MobileMenuPanel
            theme={theme}
            panelRef={panelRef}
            panelId={panelId}
            isOpen={mobileMenu.isOpen}
            NavLinksComponent={NavLinksComponent}
            activeAnchorId={activeAnchorId}
            links={navLinks}
            onLinkClick={mobileMenu.close}
          />
        </div>
      </div>
    </header>
  );
}

type HeaderLayoutProps = {
  theme: ThemeConfig;
  activeAnchorId: string | null;
  NavLinksComponent: HeaderNavLinksComponent;
  links: HeaderNavLink[];
};

function HeaderDesktop({
  theme,
  activeAnchorId,
  NavLinksComponent,
  links,
}: HeaderLayoutProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <Logo variant="thin" logoPath={theme.logoPath} />
      <NavLinksComponent
        theme={theme}
        activeAnchorId={activeAnchorId}
        variant="desktop"
        links={links}
      />
    </div>
  );
}

type HeaderMobileProps = {
  theme: ThemeConfig;
  isMenuOpen: boolean;
  panelId: string;
  onToggleMenu: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

function HeaderMobile({
  theme,
  isMenuOpen,
  panelId,
  onToggleMenu,
  triggerRef,
}: HeaderMobileProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <Logo variant="mobile" logoPath={theme.logoPath} />
      <MenuButton
        ref={triggerRef}
        isOpen={isMenuOpen}
        ariaControls={panelId}
        theme={theme}
        onToggle={onToggleMenu}
      />
    </div>
  );
}

type LogoProps = {
  variant: "tall" | "thin" | "mobile";
  logoPath: string;
};

function Logo({ variant, logoPath }: LogoProps) {
  const baseClasses =
    "w-auto transition-all duration-300 motion-reduce:transition-none";

  const sizeClasses =
    variant === "tall" ? "h-[150px]" : variant === "thin" ? "h-12" : "h-10";

  return (
    <Link href="/" className="inline-block">
      <Image
        src={logoPath}
        alt="Raid Guild Logo"
        width={632}
        height={166}
        priority
        className={[baseClasses, sizeClasses].join(" ")}
      />
    </Link>
  );
}

type MenuButtonProps = {
  isOpen: boolean;
  ariaControls: string;
  theme: ThemeConfig;
  onToggle: () => void;
};

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButtonComponent(
    { isOpen, ariaControls, theme, onToggle }: MenuButtonProps,
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={ariaControls}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={onToggle}
        className={[
          "inline-flex items-center justify-center rounded-md px-3 py-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
          theme.navHover,
        ].join(" ")}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden />
        ) : (
          <Menu className="h-6 w-6" aria-hidden />
        )}
      </button>
    );
  }
);

type MobileMenuPanelProps = {
  theme: ThemeConfig;
  panelId: string;
  panelRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  activeAnchorId: string | null;
  NavLinksComponent: HeaderNavLinksComponent;
  links: HeaderNavLink[];
  onLinkClick?: () => void;
};

function MobileMenuPanel({
  theme,
  panelId,
  panelRef,
  isOpen,
  activeAnchorId,
  NavLinksComponent,
  links,
  onLinkClick,
}: MobileMenuPanelProps) {
  if (!isOpen) return;
  return (
    <div
      id={panelId}
      ref={panelRef}
      aria-hidden={!isOpen}
      className="relative flex justify-end bg-transparent transition-all duration-300 motion-reduce:transition-none"
    >
      <div
        className={[
          "px-4 py-6 w-full max-w-[16rem] origin-top overflow-hidden rounded-b-md type-display-md transition-all duration-300 motion-reduce:transition-none",
          theme.menuSurface,
          isOpen
            ? "mt-2 scale-y-100 opacity-100"
            : "mt-0 scale-y-95 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <NavLinksComponent
          theme={theme}
          activeAnchorId={activeAnchorId}
          variant="mobile"
          links={links}
          onLinkClick={onLinkClick}
        />
      </div>
    </div>
  );
}

type UseActiveAnchorOptions = {
  enabled: boolean;
  headerHeight: number;
  navAnchorIds: string[];
};

function useActiveAnchor({
  enabled,
  headerHeight,
  navAnchorIds,
}: UseActiveAnchorOptions): string | null {
  const [activeAnchorId, setActiveAnchorId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActiveAnchorId(null);
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    let rafId = 0;

    const evaluate = () => {
      rafId = 0;
      const scrollPosition = window.scrollY + headerHeight;

      let firstAvailableAnchor: string | null = null;
      let activeAnchor: string | null = null;

      for (const anchorId of navAnchorIds) {
        const element = document.getElementById(anchorId);
        if (!element) {
          continue;
        }

        if (firstAvailableAnchor === null) {
          firstAvailableAnchor = anchorId;
        }

        if (scrollPosition >= element.offsetTop - 4) {
          activeAnchor = anchorId;
        }
      }

      setActiveAnchorId(activeAnchor ?? firstAvailableAnchor);
    };

    const handleScroll = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(evaluate);
    };

    evaluate();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled, headerHeight, navAnchorIds]);

  return activeAnchorId;
}

function getAnchorId(item: NavItem): string | null {
  if ("anchor" in item && typeof item.anchor === "string") {
    const normalized = item.anchor.startsWith("#")
      ? item.anchor.slice(1)
      : item.anchor;
    return normalized || null;
  }

  if ("href" in item && typeof item.href === "string") {
    const hashIndex = item.href.indexOf("#");
    if (hashIndex === -1) {
      return null;
    }
    const anchorValue = item.href.slice(hashIndex + 1);
    return anchorValue || null;
  }

  return null;
}

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

    const applyMatchState = (matches: boolean) => {
      setIsDesktop(matches);
    };

    applyMatchState(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) =>
      applyMatchState(event.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", listener);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  return isDesktop;
}

type UseMobileMenuOptions = {
  panelRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

type MobileMenuState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

function useMobileMenu({
  panelRef,
  triggerRef,
}: UseMobileMenuOptions): MobileMenuState {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((previous) => !previous), []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!isOpen) {
      return;
    }

    const panel = panelRef.current;
    const triggerNode = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.hasAttribute("disabled"))
      : [];

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (firstFocusable) {
      firstFocusable.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerNode?.focus();
    };
  }, [close, isOpen, panelRef, triggerRef]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const panel = panelRef.current;
      const trigger = triggerRef.current;
      const target = event.target as Node | null;

      if (!panel || !target) {
        return;
      }

      const isWithinPanel = panel.contains(target);
      const isWithinTrigger = trigger?.contains(target);

      if (!isWithinPanel && !isWithinTrigger) {
        close();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [close, isOpen, panelRef, triggerRef]);

  return { isOpen, open, close, toggle };
}
