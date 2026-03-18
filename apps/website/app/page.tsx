import { ThumbnailViewer } from "./_components/thumbnail-viewer";
import { HeroSection } from "./chrome/_components/hero-section";

export default function Page() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <ThumbnailViewer />
      </div>
      <div className="dark text-foreground bg-background">
        <HeroSection className="max-w-4xl mx-auto px-6" />
      </div>
    </main>
  );
}
