import { CHROME_STORE_URL } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="z-10 sticky top-0 bg-background/95 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold gap-2.5 flex items-center">
          <Image
            src="/icon.png"
            width={32}
            height={32}
            alt="Logo of YouTube Thumbnail Viewer"
          />
          <div className="max-sm:hidden">
            <span className="sr-only">YouTube</span> Thumbnail Viewer
          </div>
        </Link>
        <nav className="flex items-center">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
          >
            Viewer
          </Link>
          <Link
            href="/chrome"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
          >
            Chrome Extension
          </Link>
        </nav>
        <div className="max-sm:hidden">
          <Button asChild>
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
              <ChromeIcon className="size-4" />
              Add to Chrome
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
