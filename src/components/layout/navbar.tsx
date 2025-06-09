import Image from "next/image";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-3 py-3 md:px-12">
      <div className="mx-auto flex items-center justify-between">
        {/* logo  */}
        <Link href="/" className="group relative block h-16 w-16">
          <Image
            src="/logo_solvro_mono.svg"
            alt="Logo Solvro mono"
            fill
            className="pointer-events-none absolute inset-0 z-10 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
            priority
          />
          <Image
            src="/logo_solvro.svg"
            alt="Logo Solvro"
            fill
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            priority
          />
        </Link>

        {/* rozwijany navbar (kiedys rozwijany xd) */}
        <button
          aria-label="Settings"
          className="rounded-4xl p-2 transition-colors"
        >
          <FiSettings
            className="text-primary hover:text-primary-foreground h-12 transition-colors duration-300"
            size={40}
          />
        </button>
      </div>
    </nav>
  );
}
