import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { ThumbnailViewer } from "./_components/thumbnail-viewer";
import { HeroSection } from "./chrome/_components/hero-section";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
};

export default function Page() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
        <Suspense>
          <ThumbnailViewer />
        </Suspense>
      </div>
      <div className="dark text-foreground bg-background">
        <HeroSection className="max-w-4xl mx-auto px-6" />
      </div>
    </main>
  );
}
