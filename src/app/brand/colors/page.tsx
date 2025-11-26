import Link from "next/link";

export default function ColorsPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-lg mb-8">Colors</h1>

        <div className="space-y-16">
          <section>
            <h2 className="text-heading-lg mb-6">Primary Colors</h2>
            <p className="text-body-base text-muted-foreground mb-6">
              The primary palette uses a warm-hued high contrast combination of
              red, off black, and off white. The palette is warm and energetic
              to inspire action.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-moloch-800 h-24 rounded-lg flex items-center justify-center">
                  <span className="text-scroll-100 text-body-lg font-bold">
                    Moloch 800
                  </span>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="text-heading-md mb-2">Moloch 800</h3>
                  <p className="text-body-base text-muted-foreground mb-2">
                    #29100A
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-moloch-400 h-24 rounded-lg flex items-center justify-center">
                  <span className="text-scroll-100 text-body-lg font-bold">
                    Moloch 400
                  </span>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="text-heading-md mb-2">Moloch 400</h3>
                  <p className="text-body-base text-muted-foreground mb-2">
                    #D25C41
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-scroll-100 h-24 rounded-lg flex items-center justify-center border border-border">
                  <span className="text-moloch-800 text-body-lg font-bold">
                    Scroll 100
                  </span>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="text-heading-md mb-2">Scroll 100</h3>
                  <p className="text-body-base text-muted-foreground mb-2">
                    #F9F7E7
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg mb-6">Secondary Palette</h2>
            <p className="text-body-base text-muted-foreground mb-6">
              The secondary colors expand on the primary brand colors to add
              depth to UI elements, layouts, and illustrations.
            </p>
            <div className="space-y-8">
              <div>
                <h3 className="text-heading-md mb-4">Moloch Color Scale</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  <div className="space-y-2">
                    <div className="bg-moloch-100 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 100</p>
                      <p className="text-body-sm text-muted-foreground">
                        #FAEEEB
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-moloch-200 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 200</p>
                      <p className="text-body-sm text-muted-foreground">
                        #EFC5BB
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-moloch-300 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 300</p>
                      <p className="text-body-sm text-muted-foreground">
                        #E39B8B
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-moloch-400 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 400</p>
                      <p className="text-body-sm text-muted-foreground">
                        #D25C41
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-moloch-500 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 500</p>
                      <p className="text-body-sm text-muted-foreground">
                        #BD482D
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-moloch-600 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 600</p>
                      <p className="text-body-sm text-muted-foreground">
                        #8B3521
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-moloch-700 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 700</p>
                      <p className="text-body-sm text-muted-foreground">
                        #5C2316
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-moloch-800 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Moloch 800</p>
                      <p className="text-body-sm text-muted-foreground">
                        #29100A
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-heading-md mb-4">Scroll Color Scale</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  <div className="space-y-2">
                    <div className="bg-scroll-100 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 100</p>
                      <p className="text-body-sm text-muted-foreground">
                        #F9F7E7
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-scroll-200 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 200</p>
                      <p className="text-body-sm text-muted-foreground">
                        #ECE5AC
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-scroll-300 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 300</p>
                      <p className="text-body-sm text-muted-foreground">
                        #DCCD6A
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-scroll-400 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 400</p>
                      <p className="text-body-sm text-muted-foreground">
                        #D2C141
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-scroll-500 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 500</p>
                      <p className="text-body-sm text-muted-foreground">
                        #B5A22C
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-scroll-600 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 600</p>
                      <p className="text-body-sm text-muted-foreground">
                        #837820
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-scroll-700 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 700</p>
                      <p className="text-body-sm text-muted-foreground">
                        #534A13
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-scroll-800 h-16 rounded-lg border border-border"></div>
                    <div className="text-center">
                      <p className="text-body-sm font-medium">Scroll 800</p>
                      <p className="text-body-sm text-muted-foreground">
                        #211E07
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg mb-6">Neutral Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-4">
              <div className="space-y-2">
                <div className="bg-neutral-100 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 100</p>
                  <p className="text-body-sm text-muted-foreground">#F1EFEE</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-200 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 200</p>
                  <p className="text-body-sm text-muted-foreground">#D5CECD</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-300 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 300</p>
                  <p className="text-body-sm text-muted-foreground">#B9AEAC</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-400 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 400</p>
                  <p className="text-body-sm text-muted-foreground">#9E8E8A</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-500 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 500</p>
                  <p className="text-body-sm text-muted-foreground">#806F6B</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-600 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 600</p>
                  <p className="text-body-sm text-muted-foreground">#645754</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-700 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 700</p>
                  <p className="text-body-sm text-muted-foreground">#433937</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-800 h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral 800</p>
                  <p className="text-body-sm text-muted-foreground">#221D1C</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-white h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral White</p>
                  <p className="text-body-sm text-muted-foreground">#FAFAFA</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-neutral-black h-16 rounded-lg border border-border"></div>
                <div className="text-center">
                  <p className="text-body-sm font-medium">Neutral Black</p>
                  <p className="text-body-sm text-muted-foreground">#0D0D0D</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg mb-6">For Developers</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-heading-md mb-3">
                  Where to Find the Colors
                </h3>
                <p className="text-body-base text-muted-foreground mb-4">
                  All brand colors are defined as CSS custom properties in{" "}
                  <code className="text-code-md bg-muted px-2 py-1 rounded">
                    src/app/globals.css
                  </code>
                  . The color variables are defined in the{" "}
                  <code className="text-code-md bg-muted px-2 py-1 rounded">
                    :root
                  </code>{" "}
                  selector and mapped to Tailwind utilities in the{" "}
                  <code className="text-code-md bg-muted px-2 py-1 rounded">
                    @theme inline
                  </code>{" "}
                  block.
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
                <p className="text-base mb-3 font-medium">View global.css:</p>
                <Link
                  href="https://github.com/raid-guild/brand/blob/main/src/app/globals.css"
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
                <h3 className="text-heading-md mb-3">Usage Example</h3>
                <p className="text-body-base text-muted-foreground mb-4">
                  Once configured, you can use the colors with Tailwind utility
                  classes:
                </p>
                <div className="bg-muted p-4 rounded-lg border border-border">
                  <pre className="text-code-sm overflow-x-auto">
                    <code>{`// Example: Using Moloch 400
<div className="bg-moloch-400 text-scroll-100 p-4 rounded-lg">
  <h2 className="text-heading-md">Call to Action</h2>
  <p className="text-body-base">
    This button uses the primary brand color.
  </p>
</div>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
