import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function HeroSection({
  className,
  ...props
}: React.ComponentProps<typeof motion.section>) {
  return (
    <motion.section
      className={cn(
        "py-8 flex flex-col items-center text-center gap-4",
        className,
      )}
      {...props}
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
        YouTube Thumbnail <span className="text-muted-foreground">Viewer</span>
      </h1>
      <p className="max-w-lg text-muted-foreground text-lg leading-snug text-balance">
        Paste any YouTube URL or video ID to instantly view and download
        thumbnails in every available resolution.
      </p>
    </motion.section>
  );
}
