import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

type LocaleMessages = Record<
  string,
  {
    message: string;
    description: string;
  }
>;

const EXPECTED_LOCALES = [
  "ar",
  "am",
  "bg",
  "bn",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "en_AU",
  "en_GB",
  "en_US",
  "es",
  "es_419",
  "et",
  "fa",
  "fi",
  "fil",
  "fr",
  "gu",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "kn",
  "ko",
  "lt",
  "lv",
  "ml",
  "mr",
  "ms",
  "nl",
  "no",
  "pl",
  "pt_BR",
  "pt_PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "sw",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "vi",
  "zh_CN",
  "zh_TW",
] as const;

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = path.resolve(TEST_DIR, "../../public/_locales");

function readLocaleMessages(locale: string): LocaleMessages {
  const filePath = path.join(LOCALES_DIR, locale, "messages.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as LocaleMessages;
}

describe("extension locales", () => {
  it("ships the exact supported locale set", () => {
    const localeDirs = fs
      .readdirSync(LOCALES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    expect(localeDirs).toEqual([...EXPECTED_LOCALES].sort());
  });

  it("keeps every locale file in sync with English keys", () => {
    const englishMessages = readLocaleMessages("en");
    const expectedKeys = Object.keys(englishMessages).sort();

    for (const locale of EXPECTED_LOCALES) {
      const messages = readLocaleMessages(locale);
      expect(Object.keys(messages).sort()).toEqual(expectedKeys);

      for (const key of expectedKeys) {
        expect(messages[key]?.message.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
