import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is YouTube Thumbnail Viewer free?",
    answer:
      "Yes, it's completely free. There are no ads, no subscriptions, and no hidden costs.",
  },
  {
    question: "Which browsers does it support?",
    answer:
      "YouTube Thumbnail Viewer is a Chrome extension and works on Google Chrome and other Chromium-based browsers such as Microsoft Edge and Brave.",
  },
  {
    question: "Does it work on all YouTube videos?",
    answer:
      "Yes. The extension activates automatically on any YouTube watch page (youtube.com/watch) and displays the thumbnail for that video.",
  },
  {
    question: "What image resolution does it show?",
    answer:
      "It always tries to fetch the highest available resolution — maxres (1280×720) first, and falls back to medium quality if the maxres thumbnail is not available.",
  },
  {
    question: "Can I save or download the thumbnail?",
    answer:
      "Click the thumbnail to open the full-size image in a new browser tab, where you can save it using your browser's standard image save option.",
  },
  {
    question: "Does the extension collect any personal data?",
    answer:
      "No. The extension does not collect, store, or transmit any personal data. It only reads the video ID from the current YouTube page URL to fetch the thumbnail.",
  },
  {
    question: "Does it work on YouTube Shorts?",
    answer:
      "No. YouTube Shorts use a different URL format (youtube.com/shorts) and are not currently supported. The extension only activates on standard YouTube watch pages.",
  },
  {
    question: "What permissions does the extension require?",
    answer:
      "The extension only requests access to youtube.com pages. It does not require access to your browsing history, bookmarks, or any other websites.",
  },
  {
    question: "Will it slow down YouTube?",
    answer:
      "No. The extension is lightweight and only fetches a single thumbnail image when you open a video page. It has no impact on YouTube's playback or overall performance.",
  },
  {
    question: "What if the thumbnail doesn't appear?",
    answer:
      "Try refreshing the YouTube page. If the issue persists, the video may not have a publicly accessible thumbnail. You can also report the issue on the GitHub repository.",
  },
  {
    question: "Is the source code available?",
    answer:
      "Yes. YouTube Thumbnail Viewer is open source. You can view, audit, and contribute to the code on GitHub at github.com/kazuito/youtube-thumbnail-viewer.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "No. Chrome extensions are not supported on mobile browsers. The extension works on desktop versions of Chrome and other Chromium-based browsers only.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FaqSection() {
  return (
    <section className="py-16 flex flex-col gap-8 border-t border-border">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Everything you need to know about the extension.
        </p>
      </div>
      <Accordion type="single" collapsible>
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} value={`faq-${i}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
