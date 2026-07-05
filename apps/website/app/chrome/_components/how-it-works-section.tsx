import { HOW_IT_WORKS_STEPS } from "../_lib/steps";
import { StepItem } from "./step-item";

export function HowItWorksSection() {
  return (
    <section className="py-16 flex flex-col gap-8 border-t border-border">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">How it works</h2>
        <p className="text-muted-foreground">Up and running in seconds.</p>
      </div>
      <div className="flex flex-col gap-6">
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <StepItem key={step.title} number={i + 1} {...step} />
        ))}
      </div>
    </section>
  );
}
