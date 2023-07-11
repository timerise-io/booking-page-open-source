import { selector } from "recoil";
import { langAtom } from "state/atoms/langAtom";

const KEY_TO_LOCALE: Record<string, string> = {
  bg: "bg",
  cs: "cs",
  nl: "nl",
  en: "en-gb",
  fi: "fi",
  fr: "fr",
  de: "de",
  el: "el",
  hu: "hu",
  it: "it",
  pl: "pl",
  pt: "pt",
  es: "es",
  sk: "sk",
  sv: "sv",
  uk: "uk",
  tr: "tr",
};

export const dateLocaleSelector = selector({
  key: "dateLocaleSelector",
  get: ({ get }) => {
    const key = get(langAtom);
    return KEY_TO_LOCALE[key] ?? "en-gb";
  },
});
