import { cookies, headers } from "next/headers";

import { Navbar } from "@/components/layout/navbar";

// Server component wrapper: reads cookie (or Accept-Language if missing) and passes initialLang
export async function NavbarWrapper() {
  const cookieStore = await cookies();
  let lang = cookieStore.get("lang")?.value as "pl" | "en" | "de" | undefined;
  if (!lang || !["pl", "en", "de"].includes(lang)) {
    const hdrs = await headers();
    const accept = hdrs.get("accept-language") ?? "";
    const primary = (accept.split(",")[0] ?? "").trim().toLowerCase();
    if (primary.startsWith("pl")) {
      lang = "pl";
    } else if (primary.startsWith("de")) {
      lang = "de";
    } else {
      lang = "en";
    }
  }
  return <Navbar initialLang={lang} />;
}

// no default export to prefer named exports
