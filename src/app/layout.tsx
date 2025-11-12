import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { NavbarWrapper } from "@/components/layout/navbar-wrapper";
import { inter } from "@/lib/fonts";
import { QueryProvider } from "@/lib/query-client";

import "./globals.css";

export const metadata: Metadata = {
  title: "Unite! PWr x TU Graz: Journey through the Silicon World",
  description:
    "A commemorative-educational website for the Unite! project about semiconductors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body
          className={`${inter.className} flex min-h-screen flex-col font-sans antialiased`}
        >
          <NavbarWrapper />
          {children}
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
