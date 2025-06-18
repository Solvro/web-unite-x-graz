import { Provider } from "jotai";
import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
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
        <Provider>
          <body
            className={`${inter.className} flex min-h-screen flex-col font-sans antialiased`}
          >
            <Navbar />
            {children}
            <Footer />
          </body>
        </Provider>
      </QueryProvider>
    </html>
  );
}
