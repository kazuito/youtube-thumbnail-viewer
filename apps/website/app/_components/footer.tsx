import { CHROME_STORE_URL, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {SITE_NAME}
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/kazuito/youtube-thumbnail-viewer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Chrome Web Store
          </a>
        </div>
      </div>
    </footer>
  );
}
