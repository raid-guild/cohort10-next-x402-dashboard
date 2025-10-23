export default function TypographyPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-lg mb-8">Typography</h1>
        <p className="text-body-lg text-muted-foreground mb-12">
          Font families, scales, and text styling for the Raid Guild brand.
        </p>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-heading-lg mb-6">Font Families</h2>
            <div className="space-y-8">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">Mazius Display</h3>
                <div className="space-y-4">
                  <div className="text-display-lg">Display Large</div>
                  <div className="text-display-md">Display Medium</div>
                  <div className="text-display-sm">Display Small</div>
                </div>
                <p className="text-body-base text-muted-foreground mt-4">
                  Primary display font for headings and large text
                </p>
              </div>
              
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">EB Garamond</h3>
                <div className="space-y-4">
                  <div className="text-body-lg">Body Large</div>
                  <div className="text-body-base">Body Base</div>
                  <div className="text-body-sm">Body Small</div>
                </div>
                <p className="text-body-base text-muted-foreground mt-4">
                  Secondary body font for readable content
                </p>
              </div>
              
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">Ubuntu Mono</h3>
                <div className="font-mono text-body-base">Code and monospace content</div>
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
                <p className="text-body-sm text-muted-foreground">Line height: 110% | Letter spacing: -2%</p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-display-md mb-2">Display Medium - 60px</div>
                <p className="text-body-sm text-muted-foreground">Line height: 120% | Letter spacing: -1%</p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-display-sm mb-2">Display Small - 48px</div>
                <p className="text-body-sm text-muted-foreground">Line height: 120% | Letter spacing: 0%</p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-heading-lg mb-2">Heading Large - 36px</div>
                <p className="text-body-sm text-muted-foreground">Line height: 120% | Letter spacing: 0%</p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-heading-md mb-2">Heading Medium - 28px</div>
                <p className="text-body-sm text-muted-foreground">Line height: 130% | Letter spacing: 0%</p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-body-lg mb-2">Body Large - 20px</div>
                <p className="text-body-sm text-muted-foreground">Line height: 140% | Letter spacing: 0%</p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-body-base mb-2">Body Base - 16px</div>
                <p className="text-body-sm text-muted-foreground">Line height: 160% | Letter spacing: 0%</p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <div className="text-body-sm mb-2">Body Small - 12px</div>
                <p className="text-body-sm text-muted-foreground">Line height: 160% | Letter spacing: 0%</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-heading-lg mb-6">Usage Guidelines</h2>
            <div className="space-y-4">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Hierarchy</h3>
                <p className="text-body-base text-muted-foreground">
                  Use display fonts for main headings, body fonts for content, and mono for code
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Contrast</h3>
                <p className="text-body-base text-muted-foreground">
                  Ensure sufficient contrast between text and background colors
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Spacing</h3>
                <p className="text-body-base text-muted-foreground">
                  Maintain consistent spacing between text elements using the defined line heights
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
