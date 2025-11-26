import Link from "next/link";

export default function TypographyPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-lg mb-8">Typography</h1>

        <div className="space-y-16">
          <section>
            <h2 className="text-heading-lg mb-6">Font Families</h2>
            <div className="space-y-8">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-3xl font-display mb-4 text-moloch-400">
                  Mazius Display
                </h3>
                <div className="space-y-4">
                  <div className="text-display-lg">Display Large</div>
                  <div className="text-display-md">Display Medium</div>
                  <div className="text-display-sm">Display Small</div>
                </div>
                <p className="text-body-base text-muted-foreground mt-4">
                  Mazius Display is the display typeface. It is a high-contrast
                  serif font with a calligraphic feel, influenced by latin
                  chancery hands. The bold weight is preferred for headlines to
                  editorialize layouts. The two italic weights can be combined
                  to increase expressiveness. Use for headlines and brand
                  graphics.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-3xl font-body mb-4 text-moloch-400">
                  EB Garamond
                </h3>
                <div className="space-y-4">
                  <div className="text-body-lg font-body">Body Large</div>
                  <div className="text-body-base font-body">Body Base</div>
                  <div className="text-body-sm font-body">Body Small</div>
                </div>
                <p className="text-body-base text-muted-foreground mt-4">
                  EB Garamond is the secondary typeface, used for body and
                  supporting copy in communications. This typeface is also used
                  heavily in UI components in the design system. Garamond was
                  chosen because of its high readability.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-3xl font-mono mb-4 text-moloch-400">
                  Ubuntu Mono
                </h3>
                <div className="space-y-4">
                  <div className="font-mono text-body-lg">Monospace Large</div>
                  <div className="font-mono text-body-base">Monospace Base</div>
                  <div className="font-mono text-body-sm">Monospace Small</div>
                </div>
                <p className="text-body-base text-muted-foreground mt-4">
                  Monospace font for code and technical content
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg mb-6">Type Scale</h2>
            <div className="space-y-4">
              <div className="p-6 border border-border rounded-lg">
                <div className="text-display-lg mb-2">Display Large - 80px</div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 110% | Letter spacing: -2%
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-display-md mb-2">
                  Display Medium - 60px
                </div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 120% | Letter spacing: -1%
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-display-sm mb-2">Display Small - 48px</div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 120% | Letter spacing: 0%
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-heading-lg mb-2">Heading Large - 36px</div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 120% | Letter spacing: 0%
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-heading-md mb-2">
                  Heading Medium - 28px
                </div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 130% | Letter spacing: 0%
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-body-lg mb-2">Body Large - 20px</div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 140% | Letter spacing: 0%
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-body-base mb-2">Body Base - 16px</div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 160% | Letter spacing: 0%
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-body-sm mb-2">Body Small - 12px</div>
                <p className="text-body-sm text-muted-foreground">
                  Line height: 160% | Letter spacing: 0%
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg mb-6">Developers</h2>
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
                <p className="text-base mb-3 font-medium">
                  {" "}
                  Download font files:
                </p>
                <Link
                  href="https://github.com/raid-guild/brand/tree/main/public/fonts"
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

              <div>
                <h3 className="text-heading-md mb-4">Typography Classes</h3>
                <p className="text-body-base mb-4">
                  Available className utilities from globals.css:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-display-lg
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-display-md
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-display-sm
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-heading-lg
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-heading-md
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-heading-sm
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-body-lg
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-body-md
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-body-sm
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-label
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-label-md
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-label-sm
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-code-lg
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-code-md
                  </code>
                  <code className="text-code-md p-2 bg-muted rounded">
                    text-code-sm
                  </code>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
