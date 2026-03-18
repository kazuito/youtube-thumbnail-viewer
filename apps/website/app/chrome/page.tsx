import { env } from "@/lib/env";
import { CHROME_STORE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import chromePackage from "../../../chrome/package.json";
import { FaqSection, faqJsonLd } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { ReviewsSection } from "./_components/reviews-section";

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
  ...(env.CHROME_STORE_RATING_VALUE && env.CHROME_STORE_RATING_COUNT
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: env.CHROME_STORE_RATING_VALUE,
          ratingCount: env.CHROME_STORE_RATING_COUNT,
          bestRating: "5",
          worstRating: "1",
        },
      }
    : {}),
  inLanguage: ["en", "ar", "de", "es", "fr", "hi", "it", "ja", "ko"],
  featureList: [
    "View YouTube thumbnails inline",
    "Automatic highest resolution selection",
    "9 languages supported",
  ],
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
        <FeaturesSection />
        <HowItWorksSection />
        <ReviewsSection />
        <FaqSection />
      </main>
    </>
  );
}
