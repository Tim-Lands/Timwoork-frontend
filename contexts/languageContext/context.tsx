import { createContext, useState, useEffect } from "react";
import translates from "./allTranslates";
import Cookies from "js-cookie";

export const LanguageContext = createContext(null);

export const LanguageProvider = (props) => {
  const lang = Cookies.get("lang");

  const [language, setLanguage] = useState(lang || "ar");
  function getSectionLanguage(section) {
    return function getLanguage(name) {
      if (translates[section][name]) {
        return translates[section][name][language];
      } else {
        console.log(name);
      }
    };
  }
  useEffect(() => {
    Cookies.set("lang", language);
  }, [language]);
  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, getSectionLanguage }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
