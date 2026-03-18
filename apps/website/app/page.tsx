import { ChromeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CHROME_STORE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import chromePackage from "../../chrome/package.json";
import { FaqSection, faqJsonLd } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { HowItWorksSection } from "./_components/how-it-works-section";

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
  inLanguage: ["en", "ar", "de", "es", "fr", "hi", "it", "ja", "ko"],
  featureList: [
    "View YouTube thumbnails inline",
    "Automatic highest resolution selection",
    "9 languages supported",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
      <header className="sticky top-0 bg-linear-to-b from-background to-transparent">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold gap-2.5 flex items-center">
            <Image
              src="/icon.png"
              width={32}
              height={32}
              alt="Logo of YouTube Thumbnail Viewer"
            />
            <span className="sr-only">YouTube</span> Thumbnail Viewer
          </Link>
          <Button asChild>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChromeIcon className="size-4" />
              Add to Chrome
            </a>
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
      </main>
    </div>
  );
}
