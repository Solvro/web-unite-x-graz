import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Journey Through The Silicon World",
    description:
      "A Unite! Seed Fund project by KN Solvro and BEST Graz exploring the world of semiconductors.",
  },
  pl: {
    title: "Podróż przez Świat Krzemu",
    description:
      "Projekt Unite! Seed Fund realizowany przez KN Solvro i BEST Graz — eksploracja świata półprzewodników.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...(metaByLocale[locale] ?? metaByLocale.en),
    icons: { icon: "/favicon.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pl")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
