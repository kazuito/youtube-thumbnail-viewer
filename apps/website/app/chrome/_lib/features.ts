import {
  Globe,
  Image as ImageIcon,
  MousePointerClick,
  Zap,
} from "lucide-react";
import { SUPPORTED_CHROME_LOCALE_COUNT } from "./locales";

export const FEATURES = [
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
    title: `${SUPPORTED_CHROME_LOCALE_COUNT} Locales Supported`,
    description:
      "Available across Chrome locales including Arabic, Bengali, German, Japanese, Portuguese, Chinese, and more.",
  },
];
