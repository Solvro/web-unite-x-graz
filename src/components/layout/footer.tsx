import Link from "next/link";

import { vt323 } from "@/lib/fonts";

export function Footer() {
  return (
    <footer className="z-1 mt-auto w-full bg-[#101314] p-4 py-8 text-center">
      <p className={`${vt323.className} text-md`}>
        Made with 💚️ by{" "}
        <Link href="https://solvro.pwr.edu.pl/pl/" className="underline">
          Solvro
        </Link>
      </p>
    </footer>
  );
}
