import { ChromeIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
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
        <div className="flex justify-center pt-16 mask-b-from-30% mask-b-to-90%">
          <Link
            href="/chrome"
            className="rounded-full hover:scale-120 transition active:scale-100"
          >
            <ChromeIcon className="size-32 rotate-full" />
          </Link>
        </div>
        <HeroSection className="max-w-4xl pt-0 mx-auto px-6" />
      </div>
    </main>
  );
}
