import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ar: {
    translation: {
      home: `الرئيسيه`,
      about: `عن الموقع`,
      contect: `المحتوى`,
      dashboard: `لوحة التحكم`,
    },
  },
  eng: {
    translation: {
      home: `home`,
      about: `about`,
      contect: `content`,
      dashboard: `dashboard`,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
