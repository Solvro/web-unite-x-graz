import { NextResponse } from "next/server";

const SUPPORTED = ["pl", "en", "de"] as const;
type Lang = (typeof SUPPORTED)[number];

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json().catch(() => ({}) as unknown);
    const lang =
      typeof body === "object" && body !== null && "lang" in body
        ? (body as { lang?: string }).lang
        : undefined;
    const value: Lang = SUPPORTED.includes(lang as Lang)
      ? (lang as Lang)
      : "en";
    const response = NextResponse.json({ ok: true });
    response.cookies.set("lang", value, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
