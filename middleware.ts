import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function detectLang(request: NextRequest): "pl" | "en" | "de" {
  const header = request.headers.get("accept-language") ?? "";
  const primary = (header.split(",")[0] ?? "").trim().toLowerCase();
  if (primary.startsWith("pl")) {
    return "pl";
  }
  if (primary.startsWith("de")) {
    return "de";
  }
  return "en";
}

export function middleware(request: NextRequest) {
  const langCookie = request.cookies.get("lang")?.value as
    | "pl"
    | "en"
    | "de"
    | undefined;
  const lang =
    langCookie && ["pl", "en", "de"].includes(langCookie)
      ? langCookie
      : detectLang(request);

  const response = NextResponse.next();
  // Only set cookie if missing or invalid to avoid unnecessary writes
  if (!langCookie || !["pl", "en", "de"].includes(langCookie)) {
    response.cookies.set("lang", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }
  return response;
}

// Optionally, scope middleware; leaving default applies to all routes
export const config = {
  matcher: ["/(.*)"],
};
