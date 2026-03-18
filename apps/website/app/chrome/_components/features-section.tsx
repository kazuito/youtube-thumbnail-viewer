import {
  Globe,
  Image as ImageIcon,
  MousePointerClick,
  Zap,
} from "lucide-react";
import { FeatureCard } from "./feature-card";

const features = [
  {
    icon: ImageIcon,
    title: "Best Quality, Automatically",
    description:
      "Always fetches the highest available resolution — maxres (1280×720) first, falling back to medium quality.",
  },
  {
    icon: Zap,
    title: "Zero Interruption",
    description:
      "Thumbnail appears inline in the description area without disrupting your watching experience.",
  },
  {
    icon: MousePointerClick,
    title: "Open Full Resolution",
    description:
      "Click the thumbnail to open the full-size image in a new tab for closer inspection.",
  },
  {
    icon: Globe,
    title: "9 Languages Supported",
    description:
      "Available in English, Arabic, German, Spanish, French, Hindi, Italian, Japanese, and Korean.",
  },
];

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
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
