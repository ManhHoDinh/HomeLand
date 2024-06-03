import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "@/../public/translations/en/global.json";
import global_vi from "@/../public/translations/vi/global.json";

const resources = {
  en: {
    translation: global_en,
  },
  vi: {
    translation: global_vi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: { escapeValue: false },
    lng: "vi",
    resources,
  });
export default i18n;
