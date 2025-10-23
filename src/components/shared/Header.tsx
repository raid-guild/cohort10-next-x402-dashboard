import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-border bg-moloch-400">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/assets/Logotype.svg" 
              alt="Raid Guild" 
              width={40} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4">
            {/* Placeholder for dropdown nav menu */}
            <div className="h-8 w-8 rounded bg-muted"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
