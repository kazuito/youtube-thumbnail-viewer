import { FEATURES } from "../_lib/features";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <section className="py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="text-muted-foreground">
          Everything you need, nothing you don't.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
