import Image from "next/image";
import Link from "next/link";

export default function LogosPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto ">
        <div className="flex flex-wrap justify-between items-baseline">
          <h1 className="text-display-lg mb-8">Logos</h1>
          <div className="mb-8">
            <Link
              href="https://github.com/raid-guild/brand/tree/main/public/assets/logos"
              className="text-lg text-primary hover:text-primary/80 transition-colors "
              target="_blank"
              rel="noopener noreferrer"
            >
              on GitHub
            </Link>
          </div>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-heading-lg mb-6">Primary Logo</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Logo on Moloch 400 background */}
              <div className="bg-[#D25C41] p-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/assets/logos/Logotype.svg"
                  alt="Raid Guild Logo"
                  width={200}
                  height={76}
                  className="h-16 w-auto"
                />
              </div>

              {/* Logo on Moloch 800 background */}
              <div className="bg-[#29100A] p-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/assets/logos/Logotype_moloch.svg"
                  alt="Raid Guild Logo"
                  width={200}
                  height={76}
                  className="h-16 w-auto"
                />
              </div>

              {/* Logo on Scroll 100 background */}
              <div className="bg-[#F9F7E7] p-8 rounded-lg flex items-center justify-center border border-border">
                <Image
                  src="/assets/logos/Logotype_moloch.svg"
                  alt="Raid Guild Logo"
                  width={200}
                  height={76}
                  className="h-16 w-auto"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg mb-6">Logo Mark</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Logomark on Moloch 400 background */}
              <div className="bg-[#D25C41] p-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/assets/logos/Logomark.svg"
                  alt="Raid Guild Logomark"
                  width={120}
                  height={120}
                  className="h-20 w-auto"
                />
              </div>

              {/* Logomark on Moloch 800 background */}
              <div className="bg-[#29100A] p-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/assets/logos/Logomark_moloch.svg"
                  alt="Raid Guild Logomark"
                  width={120}
                  height={120}
                  className="h-20 w-auto"
                />
              </div>

              {/* Logomark on Scroll 100 background */}
              <div className="bg-[#F9F7E7] p-8 rounded-lg flex items-center justify-center border border-border">
                <Image
                  src="/assets/logos/Logomark.svg"
                  alt="Raid Guild Logomark"
                  width={120}
                  height={120}
                  className="h-20 w-auto"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
