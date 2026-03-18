export const EXAMPLES = [
  {
    id: "cRZOUcpiOxY",
    title: "Fever Feels Horrible, but is Actually Awesome!",
    author: "Kurzgesagt - In a Nutshell",
  },
  {
    id: "0e3GPea1Tyg",
    title: "$456,000 Squid Game In Real Life!",
    author: "MrBeast",
  },
  {
    id: "LmZD-TU96q4",
    title: "Kenshi Yonezu - IRIS OUT",
    author: "Kenshi Yonezu",
  },
  {
    id: "zIwLWfaAg-8",
    title: "Elon Musk: The future we're building -- and boring | TED",
    author: "TED",
  },
  {
    id: "XxOh12Uhg08",
    title: "Driving Tesla Cybertruck: Everything You Need to Know",
    author: "Marques Brownlee",
  },
  { id: "rokGy0huYEA", title: "2020 — Year in Search", author: "Google" },
  {
    id: "Hz2F_S3Tl0Y",
    title: "I Jumped From Space (World Record Supersonic Freefall) ",
    author: "Red Bull",
  },
  {
    id: "jNQXAC9IVRw",
    title: "Me at the zoo",
    author: "jawed",
  },
  {
    id: "JdFRjsEZrmU",
    title: "Acid vs Lava- Testing Liquids That Melt Everything",
    author: "Mark Rober",
  },
  {
    id: "A0FZIwabctw",
    title: "Falcon Heavy & Starman",
    author: "SpaceX",
  },
  {
    id: "bBC-nXj3Ng4",
    title: "But how does bitcoin actually work?",
    author: "3Blue1Brown",
  },
  {
    id: "Qskm9MTz2V4",
    title: "RUSH E",
    author: "Sheet Music Boss",
  },
] as const;

export type Example = (typeof EXAMPLES)[number];
