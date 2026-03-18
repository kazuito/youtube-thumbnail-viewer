export const EXAMPLES = [
  { id: "XqZsoesa55w", title: "Baby Shark Dance", author: "Pinkfong" },
  {
    id: "kTJczUoc26U",
    title: "Despacito",
    author: "Luis Fonsi ft. Daddy Yankee",
  },
  { id: "JGwWNGJdvx8", title: "Shape of You", author: "Ed Sheeran" },
  {
    id: "RgKAFK5djSk",
    title: "See You Again",
    author: "Wiz Khalifa ft. Charlie Puth",
  },
  {
    id: "OPf0YbXqDm0",
    title: "Uptown Funk",
    author: "Mark Ronson ft. Bruno Mars",
  },
  { id: "9bZkp7q19f0", title: "Gangnam Style", author: "PSY" },
  { id: "fLexgOxsZu0", title: "The Lazy Song", author: "Bruno Mars" },
  {
    id: "0e3GPea1Tyg",
    title: "$456,000 Squid Game In Real Life!",
    author: "MrBeast",
  },
  { id: "hT_nvWreIhg", title: "Counting Stars", author: "OneRepublic" },
  { id: "rokGy0huYEA", title: "2020 — Year in Search", author: "Google" },
] as const;

export type Example = (typeof EXAMPLES)[number];
