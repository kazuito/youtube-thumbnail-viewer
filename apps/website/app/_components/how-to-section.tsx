import { HOW_TO_STEPS } from "../_lib/steps";
import { StepItem } from "../chrome/_components/step-item";

export function HowToSection() {
  return (
    <section className="py-16 flex flex-col gap-8 border-t border-border">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          How to download a YouTube thumbnail
        </h2>
        <p className="text-muted-foreground">
          Three steps, no signup, no watermarks.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {HOW_TO_STEPS.map((step, i) => (
          <StepItem key={step.title} number={i + 1} {...step} />
        ))}
      </div>
    </section>
  );
}
