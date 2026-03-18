import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CHROME_STORE_RATING_VALUE: z.string().default("5"),
    CHROME_STORE_RATING_COUNT: z.string().default("6"),
    CHROME_STORE_USER_COUNT: z.string().default("1,000"),
  },
  client: {
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
  },
  runtimeEnv: {
    CHROME_STORE_RATING_VALUE: process.env.CHROME_STORE_RATING_VALUE,
    CHROME_STORE_RATING_COUNT: process.env.CHROME_STORE_RATING_COUNT,
    CHROME_STORE_USER_COUNT: process.env.CHROME_STORE_USER_COUNT,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
