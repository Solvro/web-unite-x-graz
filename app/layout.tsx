import { getLocale } from "next-intl/server";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={spaceGrotesk.variable}>
      <body
        className="bg-[#0B110E] text-[#F2F4F3] antialiased"
        style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
