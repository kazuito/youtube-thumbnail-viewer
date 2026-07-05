import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE_NAME } from "@/lib/site";
import { FaqSection } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { ReviewsSection } from "./_components/reviews-section";
import { FAQ_JSON_LD, SOFTWARE_APPLICATION_JSON_LD } from "./_lib/json-ld";
import { CHROME_DESCRIPTION, CHROME_TITLE, CHROME_URL } from "./_lib/metadata";

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
    images: [{ url: "/opengraph-image.png", width: 1280, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: CHROME_TITLE,
    description: CHROME_DESCRIPTION,
    creator: "@kzito",
    images: ["/opengraph-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={SOFTWARE_APPLICATION_JSON_LD} />
      <JsonLd data={FAQ_JSON_LD} />
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
              alt="Full-resolution YouTube thumbnail opened by the extension"
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
