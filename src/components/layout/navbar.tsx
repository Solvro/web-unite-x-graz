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
        {/* Floating language switcher in the top-right */}
        <div className="fixed top-4 right-4 z-50">
          <details className="relative">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center justify-center rounded-full border border-white p-0.5">
                <span
                  aria-label="Polish"
                  title="Polish"
                  className="block h-8 w-8 overflow-hidden rounded-full"
                >
                  {/* Polish flag (circle-clipped) */}
                  <svg
                    viewBox="0 0 4 3"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                  >
                    <rect width="4" height="3" fill="#ffffff" />
                    <rect y="1.5" width="4" height="1.5" fill="#dc2626" />
                  </svg>
                </span>
              </span>
            </summary>

            {/* Menu with other flags */}
            <div className="absolute right-0 mt-2 flex flex-col items-end gap-2">
              <button
                type="button"
                aria-label="English"
                title="English"
                className="inline-flex items-center justify-center rounded-full border border-white p-0.5"
              >
                <span className="block h-8 w-8 overflow-hidden rounded-full">
                  {/* UK flag (simplified) */}
                  <svg
                    viewBox="0 0 60 30"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                  >
                    <rect width="60" height="30" fill="#012169" />
                    <path
                      d="M0 0 L60 30 M60 0 L0 30"
                      stroke="#ffffff"
                      strokeWidth="6"
                    />
                    <path
                      d="M0 0 L60 30 M60 0 L0 30"
                      stroke="#C8102E"
                      strokeWidth="3"
                    />
                    <path
                      d="M30 0 V30 M0 15 H60"
                      stroke="#ffffff"
                      strokeWidth="10"
                    />
                    <path
                      d="M30 0 V30 M0 15 H60"
                      stroke="#C8102E"
                      strokeWidth="6"
                    />
                  </svg>
                </span>
              </button>

              <button
                type="button"
                aria-label="German"
                title="German"
                className="inline-flex items-center justify-center rounded-full border border-white p-0.5"
              >
                <span className="block h-8 w-8 overflow-hidden rounded-full">
                  {/* German flag */}
                  <svg
                    viewBox="0 0 5 3"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                  >
                    <rect width="5" height="3" fill="#000000" />
                    <rect y="1" width="5" height="2" fill="#dd0000" />
                    <rect y="2" width="5" height="1" fill="#ffce00" />
                  </svg>
                </span>
              </button>
            </div>
          </details>
        </div>
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
