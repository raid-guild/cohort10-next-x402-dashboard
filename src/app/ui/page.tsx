export default function UIPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-lg mb-8">UI Components</h1>
        <p className="text-body-lg text-muted-foreground mb-12">
          Design system components and patterns for the Raid Guild brand.
        </p>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-heading-lg mb-6">Buttons</h2>
            <div className="space-y-6">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">Primary Button</h3>
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Primary Action
                </button>
              </div>
              
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">Secondary Button</h3>
                <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors">
                  Secondary Action
                </button>
              </div>
              
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">Outline Button</h3>
                <button className="border border-border px-6 py-3 rounded-lg hover:bg-muted/50 transition-colors">
                  Outline Action
                </button>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-heading-lg mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Basic Card</h3>
                <p className="text-body-base text-muted-foreground">
                  Simple card component with border and padding
                </p>
              </div>
              
              <div className="p-6 border border-border rounded-lg bg-muted/50">
                <h3 className="text-heading-md mb-2">Highlighted Card</h3>
                <p className="text-body-base text-muted-foreground">
                  Card with background color for emphasis
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-heading-lg mb-6">Form Elements</h2>
            <div className="space-y-6">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">Input Fields</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Enter text here" 
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background"
                  />
                  <textarea 
                    placeholder="Enter longer text here"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background h-24"
                  />
                </div>
              </div>
              
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-4">Checkboxes and Radio</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-body-base">Checkbox option</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="radio" className="rounded-full" />
                    <span className="text-body-base">Radio option</span>
                  </label>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-heading-lg mb-6">Navigation</h2>
            <div className="p-6 border border-border rounded-lg">
              <nav className="flex space-x-6">
                <a href="#" className="text-body-base hover:text-primary transition-colors">Home</a>
                <a href="#" className="text-body-base hover:text-primary transition-colors">Logos</a>
                <a href="#" className="text-body-base hover:text-primary transition-colors">Colors</a>
                <a href="#" className="text-body-base hover:text-primary transition-colors">Typography</a>
                <a href="#" className="text-body-base hover:text-primary transition-colors">UI</a>
              </nav>
            </div>
          </section>
          
          <section>
            <h2 className="text-heading-lg mb-6">Usage Guidelines</h2>
            <div className="space-y-4">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Consistency</h3>
                <p className="text-body-base text-muted-foreground">
                  Use consistent spacing, colors, and typography across all components
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Accessibility</h3>
                <p className="text-body-base text-muted-foreground">
                  Ensure all components meet accessibility standards with proper contrast and focus states
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-heading-md mb-2">Responsive Design</h3>
                <p className="text-body-base text-muted-foreground">
                  Components should work across all device sizes with appropriate breakpoints
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
