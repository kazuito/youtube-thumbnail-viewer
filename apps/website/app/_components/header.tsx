"use client";

import { ChromeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CHROME_STORE_URL } from "@/lib/site";

const NAV_ITEMS = [
  { href: "/", label: "Viewer" },
  { href: "/chrome", label: "Chrome Extension" },
];

export function Header() {
  const pathname = usePathname();

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
        <nav className="flex items-center gap-0.5">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                pathname === href
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="max-sm:hidden">
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
      </div>
    </header>
  );
}
