import { StepItem } from "./step-item";

const steps = [
  {
    title: "Install the extension",
    description:
      "Add YouTube Thumbnail Viewer to Chrome from the Web Store with one click.",
  },
  {
    title: "Open any YouTube video",
    description:
      "Navigate to a YouTube watch page — the extension activates automatically.",
  },
  {
    title: "See the thumbnail",
    description:
      "The video thumbnail appears at the top of the description area, ready to click and open.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 flex flex-col gap-8 border-t border-border">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">How it works</h2>
        <p className="text-muted-foreground">Up and running in seconds.</p>
      </div>
      <div className="flex flex-col gap-6">
        {steps.map((step, i) => (
          <StepItem key={step.title} number={i + 1} {...step} />
        ))}
      </div>
    </section>
  );
}
