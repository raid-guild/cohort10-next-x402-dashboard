import Link from "next/link";

export default function IconographyPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="type-display-lg mb-6">Iconography</h1>
          <p className="text-lg mb-8 text-foreground/80">
            Our icon library balances the mystical with the practical—featuring
            magical symbols like cauldrons and crystals alongside development
            and community icons. This duality reflects Raid Guild&apos;s unique
            position at the intersection of craft, collaboration, and code.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
            <p className="text-base mb-3 font-medium">
              Download all icon files:
            </p>
            <Link
              href="https://github.com/raid-guild/brand/tree/main/public/assets/icon"
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
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="type-heading-lg mb-6">8bit</h2>
            <p className="text-base mb-8 text-foreground/70">
              D&D-inspired hero characters representing individual guild member roles. Each pixelated character embodies a specific skill set.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/alchemist.svg" alt="Alchemist" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Alchemist</p>
                <p className="text-center type-body-sm">DAO Consultant</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/archer.svg" alt="Archer" className="w-full h-full" />
                </div>         
                <p className="text-center type-body-base font-medium">Archer</p>
                <p className="text-center type-body-sm">Visual Design</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/cleric.svg" alt="Cleric" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Cleric</p>
                <p className="text-center type-body-sm">Account Manager</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/druid.svg" alt="Druid" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Druid</p>
                <p className="text-center type-body-sm">Data Science</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/dwarf.svg" alt="AngryDwarf" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">AngryDwarf</p>
                <p className="text-center type-body-sm">Treasury</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/healer.svg" alt="Healer" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Healer</p>
                <p className="text-center type-body-sm">Internal Ops</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/hunter.svg" alt="Hunter" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Hunter</p>
                <p className="text-center type-body-sm">BizDev</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/monk.svg" alt="Monk" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Monk</p>
                <p className="text-center type-body-sm">PM</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/necromancer.svg" alt="Necromancer" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Necromancer</p>
                <p className="text-center type-body-sm">DevOps</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/paladin.svg" alt="Paladin" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Paladin</p>
                <p className="text-center type-body-sm">Backend Dev</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/ranger.svg" alt="Ranger" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Ranger</p>
                <p className="text-center type-body-sm">UX Design</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/rogue.svg" alt="Rogue" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Rogue</p>
                <p className="text-center type-body-sm">Legal</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/scribe.svg" alt="Scribe" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Scribe</p>
                <p className="text-center type-body-sm">Content Creator</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/tavernkeeper.svg" alt="Tavern Keeper" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Tavern Keeper</p>
                <p className="text-center type-body-sm">Community</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/warrior.svg" alt="Warrior" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Warrior</p>
                <p className="text-center type-body-sm">Frontend Dev</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                  <img src="/assets/icon/8bit/wizard.svg" alt="Wizard" className="w-full h-full" />
                </div>
                <p className="text-center type-body-base font-medium">Wizard</p>
                <p className="text-center type-body-sm">Smart Contracts</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="type-heading-lg mb-6">D&D</h2>
            <p className="text-base mb-8 text-foreground/70">
              Original Raid Guild service and community icons. These foundational icons define our core offerings and values.
            </p>
            <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-10 gap-8">
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/community.svg" alt="Community" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/consultation.svg" alt="Consultation" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/culture.svg" alt="Culture" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/dao.svg" alt="DAO" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/education.svg" alt="Education" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/experiment.svg" alt="Experiment" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/frontend.svg" alt="Frontend" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/fullstack.svg" alt="Fullstack" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/learning.svg" alt="Learning" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/manifesto.svg" alt="Manifesto" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/marketing.svg" alt="Marketing" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/robot.svg" alt="Robot" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/spear.svg" alt="Spear" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/sprint.svg" alt="Sprint" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/dd/swords.svg" alt="Swords" className="w-full h-full" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="type-heading-lg mb-6">Magic</h2>
            <p className="text-base mb-8 text-foreground/70">
              Mystical and alchemical symbols. These icons add a magical, transformative quality and evoke the spiritual side of our craft.
            </p>
            <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-10 gap-8">
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/candle.svg" alt="Candle" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/cauldron.svg" alt="Cauldron" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/chalice.svg" alt="Chalice" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/crystal.svg" alt="Crystal" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/feather.svg" alt="Feather" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/flask.svg" alt="Flask" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/hourglass.svg" alt="Hourglass" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/lantern.svg" alt="Lantern" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/moon.svg" alt="Moon" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/pumpkin.svg" alt="Pumpkin" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/sparkle.svg" alt="Sparkle" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/star.svg" alt="Star" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 text-moloch-800 dark:text-scroll-100">
                <img src="/assets/icon/magic/stars.svg" alt="Stars" className="w-full h-full" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="type-heading-lg mb-6">About the Iconography</h2>
            <p className="text-base mb-6 text-foreground/70">
              All icons are provided as SVG files for crisp rendering at any size. Icons can be colored using CSS fill or stroke properties. Primary brand colors: Moloch 800 (#29100A), Moloch 500 (#BD482D), Scroll 100 (#F9F7E7), and Scroll 700 (#534A13).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
