import { ShuffleIcon, Star } from "lucide-react";
import Link from "next/link";
import { REVIEWS } from "../_lib/reviews";

function StarRating() {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: It's fine here since the list is static and never changes
          key={i}
          className="size-3.5 fill-current text-foreground"
        />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  return (
    <section className="py-16 flex flex-col gap-8 border-t border-border">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">What Users Say</h2>
        <p className="text-muted-foreground">
          Reviews from the Chrome Web Store.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {REVIEWS.map((review) => (
          <Link
            href={review.url}
            target="_blank"
            key={review.url}
            className="rounded-xl border border-border bg-muted/40 px-5 py-4 flex flex-col gap-2"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <StarRating />
              <span className="text-muted-foreground text-sm">
                {review.date}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">{review.body}</p>
              {review.translation && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground/60 font-medium">
                    <ShuffleIcon className="size-3" strokeWidth={2.4} />
                    <span className="text-xs">Translated</span>
                    <div className="border-t grow border-dashed" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <span>{review.translation}</span>
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
