import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { FaqSection } from "./_components/faq-section";
import { HeroSection as ViewerHeroSection } from "./_components/hero-section";
import { HowToSection } from "./_components/how-to-section";
import { ResolutionsSection } from "./_components/resolutions-section";
import { ThumbnailViewer } from "./_components/thumbnail-viewer";
import { FAQ_JSON_LD, WEB_APPLICATION_JSON_LD } from "./_lib/json-ld";
import { HOME_DESCRIPTION, HOME_TITLE } from "./_lib/metadata";
import { HeroSection } from "./chrome/_components/hero-section";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    creator: "@kzito",
  },
};

export default function Page() {
  return (
    <main>
      <JsonLd data={WEB_APPLICATION_JSON_LD} />
      <JsonLd data={FAQ_JSON_LD} />
      <div className="max-w-4xl mx-auto px-6 py-10 pb-20 min-h-dvh">
        <Suspense fallback={<ViewerHeroSection />}>
          <ThumbnailViewer />
        </Suspense>
      </div>
      <div className="max-w-4xl mx-auto px-6">
        <HowToSection />
        <ResolutionsSection />
        <FaqSection />
      </div>
      <div className="dark text-foreground bg-background">
        <HeroSection titleAs="h2" className="max-w-4xl mx-auto px-6" />
      </div>
    </main>
  );
}
