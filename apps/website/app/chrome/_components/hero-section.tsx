import { ChromeIcon, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { CHROME_STORE_URL } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="py-20 flex flex-col items-center text-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
        See the thumbnail,{" "}
        <span className="text-muted-foreground">without leaving YouTube</span>
      </h1>
      <p className="max-w-xl text-muted-foreground text-lg leading-relaxed text-balance">
        A lightweight Chrome extension that displays a video's thumbnail
        directly in the description area on YouTube.
      </p>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="">
            {env.CHROME_STORE_RATING_VALUE} out of 5
            <span className="sr-only"> stars</span>
          </span>
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={i}
                className="size-3.5 fill-current text-foreground"
              />
            ))}
          </span>
        </div>
        <span className="select-none">·</span>
        <span>{env.CHROME_STORE_USER_COUNT}+ users</span>
      </div>
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
  );
}
