import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@assets/i18n/en.json";
import id from "@assets/i18n/id.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    // debug: true,
    load: "all",
    lng: localStorage.getItem("i18nextLng") || "en",
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    interpolation: {
      // escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
