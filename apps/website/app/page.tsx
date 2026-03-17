import {
  ChromeIcon,
  ExternalLink,
  Globe,
  Image,
  MousePointerClick,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "./_components/feature-card";
import { StepItem } from "./_components/step-item";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/youtube-thumbnail-viewer/gepipnmhdeemppokommnippgeeagabio";

const features = [
  {
    icon: Image,
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
      {/* Header */}
      <header className="sticky top-0 bg-linear-to-b from-background to-transparent">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-sm">
            YouTube Thumbnail Viewer
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
      </main>
    </div>
  );
}
