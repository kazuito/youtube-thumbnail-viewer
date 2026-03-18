import { Star } from "lucide-react";

const reviews = [
  {
    date: "Jan 5, 2026",
    body: "Its simple and perfect.",
  },
  {
    date: "Sep 22, 2025",
    body: "便利です",
    translation: "It's convenient.",
  },
  {
    date: "Nov 8, 2024",
    body: "Me encanta la posición en que se coloca la miniatura para fácil acceso, aprovecha muy bien el espacio desperdiciado por YT en el área de la descripción, es muy cómoda de usar",
    translation:
      "I love where the thumbnail is placed for easy access — it makes great use of the space wasted by YouTube in the description area. Very comfortable to use.",
  },
];

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
        {reviews.map((review) => (
          <div
            key={review.date}
            className="rounded-xl border border-border bg-muted/40 px-5 py-4 flex flex-col gap-2"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <StarRating />
              <span className="text-muted-foreground text-sm">
                {review.date}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm leading-relaxed">{review.body}</p>
              {review.translation && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.translation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
