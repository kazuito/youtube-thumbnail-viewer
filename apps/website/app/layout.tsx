import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { env } from "@/lib/env";
import {
  CHROME_STORE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cn } from "@/lib/utils";
import { ChromeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "YouTube thumbnail",
    "YouTube thumbnail viewer",
    "Chrome extension",
    "thumbnail preview",
    "YouTube extension",
    "browser extension",
  ],
  authors: [{ name: "kazuito", url: "https://github.com/kazuito" }],
  creator: "kazuito",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@kzito",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", geistSans.variable, geistMono.variable)}
      >
        {env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
        )}
        <NuqsAdapter>
          <header className="sticky top-0 bg-linear-to-b from-background to-transparent">
            <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
              <Link
                href="/"
                className="font-semibold gap-2.5 flex items-center"
              >
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
          {children}
          <footer className="border-t border-border mt-8">
            <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <span>
                © {new Date().getFullYear()} {SITE_NAME}
              </span>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/kazuito/youtube-thumbnail-viewer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Chrome Web Store
                </a>
              </div>
            </div>
          </footer>
        </NuqsAdapter>
      </body>
    </html>
  );
}
