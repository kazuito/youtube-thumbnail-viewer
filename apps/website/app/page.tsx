import {
  ChromeIcon,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  MousePointerClick,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import chromePackage from "../../chrome/package.json";
import { FeatureCard } from "./_components/feature-card";
import { StepItem } from "./_components/step-item";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/youtube-thumbnail-viewer/gepipnmhdeemppokommnippgeeagabio";

const faqs = [
  {
    question: "Is YouTube Thumbnail Viewer free?",
    answer:
      "Yes, it's completely free. There are no ads, no subscriptions, and no hidden costs.",
  },
  {
    question: "Which browsers does it support?",
    answer:
      "YouTube Thumbnail Viewer is a Chrome extension and works on Google Chrome and other Chromium-based browsers such as Microsoft Edge and Brave.",
  },
  {
    question: "Does it work on all YouTube videos?",
    answer:
      "Yes. The extension activates automatically on any YouTube watch page (youtube.com/watch) and displays the thumbnail for that video.",
  },
  {
    question: "What image resolution does it show?",
    answer:
      "It always tries to fetch the highest available resolution — maxres (1280×720) first, and falls back to medium quality if the maxres thumbnail is not available.",
  },
  {
    question: "Can I save or download the thumbnail?",
    answer:
      "Click the thumbnail to open the full-size image in a new browser tab, where you can save it using your browser's standard image save option.",
  },
  {
    question: "Does the extension collect any personal data?",
    answer:
      "No. The extension does not collect, store, or transmit any personal data. It only reads the video ID from the current YouTube page URL to fetch the thumbnail.",
  },
];

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const features = [
  {
    icon: ImageIcon,
    title: "Best Quality, Automatically",
    description:
      "Always fetches the highest available resolution — maxres (1280×720) first, falling back to medium quality.",
  },
  {
    icon: Zap,
    title: "Zero Interruption",
    description:
      "Thumbnail appears inline in the description area without disrupting your watching experience.",
  },
  {
    icon: MousePointerClick,
    title: "Open Full Resolution",
    description:
      "Click the thumbnail to open the full-size image in a new tab for closer inspection.",
  },
  {
    icon: Globe,
    title: "9 Languages Supported",
    description:
      "Available in English, Arabic, German, Spanish, French, Hindi, Italian, Japanese, and Korean.",
  },
];

const steps = [
  {
    title: "Install the extension",
    description:
      "Add YouTube Thumbnail Viewer to Chrome from the Web Store with one click.",
  },
  {
    title: "Open any YouTube video",
    description:
      "Navigate to a YouTube watch page — the extension activates automatically.",
  },
  {
    title: "See the thumbnail",
    description:
      "The video thumbnail appears at the top of the description area, ready to click and open.",
  },
];

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
      {/* Header */}
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
        {/* Hero */}
        <section className="py-20 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            See the thumbnail,{" "}
            <span className="text-muted-foreground">
              without leaving the page
            </span>
          </h1>
          <p className="max-w-xl text-muted-foreground text-lg leading-relaxed text-balance">
            A lightweight Chrome extension that displays a video's thumbnail
            directly in the description area on YouTube.
          </p>
          <div className="flex items-center gap-3">
            <Button asChild size="lg" className="gap-2 px-6">
              <Link
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ChromeIcon />
                Add to Chrome<span className="max-sm:hidden"> — it's free</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="https://github.com/kazuito/youtube-thumbnail-viewer"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source
                <ExternalLink />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Features</h2>
            <p className="text-muted-foreground">
              Everything you need, nothing you don't.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 flex flex-col gap-8 border-t border-border">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">How it works</h2>
            <p className="text-muted-foreground">Up and running in seconds.</p>
          </div>
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <StepItem key={step.title} number={i + 1} {...step} />
            ))}
          </div>
        </section>
        {/* FAQ */}
        <section className="py-16 flex flex-col gap-8 border-t border-border">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about the extension.
            </p>
          </div>
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
}
