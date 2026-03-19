import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/lib/env";
import {
  CHROME_STORE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import chromePackage from "../../../chrome/package.json";
import { FaqSection, faqJsonLd } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { ReviewsSection } from "./_components/reviews-section";
import {
  SUPPORTED_CHROME_LOCALE_COUNT,
  SUPPORTED_CHROME_LOCALES,
} from "./locales";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
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

const CHROME_TITLE = "YouTube Thumbnail Chrome Extension";
const CHROME_DESCRIPTION =
  "Free Chrome extension that displays YouTube video thumbnails inline, right in the description area — no page reloads, no extra tabs. Supports max resolution.";
const CHROME_URL = `${SITE_URL}chrome`;

export const metadata: Metadata = {
  title: CHROME_TITLE,
  description: CHROME_DESCRIPTION,
  keywords: [
    "YouTube thumbnail Chrome extension",
    "YouTube thumbnail viewer extension",
    "view YouTube thumbnails inline",
    "Chrome extension for YouTube",
    "YouTube thumbnail in description",
    "thumbnail preview YouTube",
  ],
  alternates: {
    canonical: CHROME_URL,
  },
  openGraph: {
    type: "website",
    url: CHROME_URL,
    siteName: SITE_NAME,
    title: CHROME_TITLE,
    description: CHROME_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: CHROME_TITLE,
    description: CHROME_DESCRIPTION,
    creator: "@kzito",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml:)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml:)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-6">
        <HeroSection />
        <div className="relative w-fit h-wit mx-auto">
          <Image
            src="/ext-demo.jpg"
            alt="YouTube Thumbnail Viewer Chrome Extension demo; shows a YouTube video page with the thumbnail displayed in the description area"
            width={800}
            height={450}
            className="rounded-s-3xl mask-r-from-65% select-none pointer-events-none"
          />
          <Link
            href="https://img.youtube.com/vi/cRZOUcpiOxY/maxresdefault.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute w-[28.96%] rounded-xs top-[38.6%] left-[35.42%] hover:brightness-110 transition active:brightness-100"
          >
            <Image
              src="/ext-demo-thumbnail.png"
              alt="YouTube Thumbnail Viewer Chrome Extension demo; shows a YouTube video page with the thumbnail displayed in the description area"
              width={800}
              height={450}
              className="pointer-events-none select-none"
            />
          </Link>
        </div>
        <FeaturesSection />
        <HowItWorksSection />
        <ReviewsSection />
        <FaqSection />
      </main>
    </>
  );
}
