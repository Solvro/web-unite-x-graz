import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (
    locale === undefined ||
    !routing.locales.includes(locale as "en" | "pl")
  ) {
    locale = routing.defaultLocale;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const messages = await import(`../messages/${locale}.json`);
  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    messages: messages.default,
  };
});
