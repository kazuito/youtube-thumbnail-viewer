import { env } from "@/lib/env";
import { buildFaqJsonLd } from "@/lib/json-ld";
import { CHROME_STORE_URL, SITE_NAME } from "@/lib/site";
import chromePackage from "../../../../chrome/package.json";
import { FAQS } from "./faqs";
import {
  SUPPORTED_CHROME_LOCALE_COUNT,
  SUPPORTED_CHROME_LOCALES,
} from "./locales";
import { CHROME_DESCRIPTION } from "./metadata";

export const SOFTWARE_APPLICATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: CHROME_DESCRIPTION,
  applicationCategory: "BrowserApplication",
  operatingSystem: "Chrome",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: CHROME_STORE_URL,
  author: {
    "@type": "Person",
    name: "Kazuma Ito",
    url: "https://github.com/kazuito",
  },
  softwareVersion: chromePackage.version,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: env.CHROME_STORE_RATING_VALUE,
    ratingCount: env.CHROME_STORE_RATING_COUNT,
    bestRating: "5",
    worstRating: "1",
  },
  inLanguage: SUPPORTED_CHROME_LOCALES,
  featureList: [
    "View YouTube thumbnails inline",
    "Automatic highest resolution selection",
    `${SUPPORTED_CHROME_LOCALE_COUNT} locales supported`,
  ],
};

export const FAQ_JSON_LD = buildFaqJsonLd(FAQS);
