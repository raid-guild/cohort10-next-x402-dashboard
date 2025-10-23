export default function ColorsPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-lg mb-8">Colors</h1>
        <p className="text-body-lg text-muted-foreground mb-12">
          Brand color palette and usage guidelines for the Raid Guild brand.
        </p>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-heading-lg mb-6">Primary Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-[#29100A] h-24 rounded-lg flex items-center justify-center">
                  <span className="text-[#F9F7E7] text-body-lg font-bold">Moloch 800</span>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="text-heading-md mb-2">Moloch 800</h3>
                  <p className="text-body-base text-muted-foreground mb-2">#29100A</p>
                  <p className="text-body-sm text-muted-foreground">
                    Primary dark color for text and backgrounds
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#D25C41] h-24 rounded-lg flex items-center justify-center">
                  <span className="text-[#F9F7E7] text-body-lg font-bold">Moloch 400</span>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="text-heading-md mb-2">Moloch 400</h3>
                  <p className="text-body-base text-muted-foreground mb-2">#D25C41</p>
                  <p className="text-body-sm text-muted-foreground">
                    Primary accent color for highlights and CTAs
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-heading-lg mb-6">Secondary Colors</h2>
            <div className="space-y-4">
              <div className="bg-[#F9F7E7] h-24 rounded-lg flex items-center justify-center border border-border">
                <span className="text-[#29100A] text-body-lg font-bold">Scroll 100</span>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Scroll 100</h3>
                <p className="text-body-base text-muted-foreground mb-2">#F9F7E7</p>
                <p className="text-body-sm text-muted-foreground">
                  Light background color for content areas
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-heading-lg mb-6">Usage Guidelines</h2>
            <div className="space-y-4">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Color Combinations</h3>
                <p className="text-body-base text-muted-foreground">
                  Use Moloch 800 on Scroll 100 backgrounds for maximum contrast and readability
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Accent Usage</h3>
                <p className="text-body-base text-muted-foreground">
                  Use Moloch 400 sparingly for call-to-action buttons and important highlights
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Accessibility</h3>
                <p className="text-body-base text-muted-foreground">
                  All color combinations meet WCAG AA contrast requirements
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
