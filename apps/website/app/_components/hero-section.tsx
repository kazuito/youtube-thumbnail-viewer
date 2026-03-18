export function HeroSection() {
  return (
    <section className="py-8 flex flex-col items-center text-center gap-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
        YouTube Thumbnail{" "}
        <span className="text-muted-foreground">Viewer</span>
      </h1>
      <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-balance">
        Paste any YouTube URL or video ID to instantly view and download
        thumbnails in every available resolution.
      </p>
    </section>
  );
}
