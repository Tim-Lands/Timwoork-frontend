import { createContext, useState, useEffect } from "react";
import translates from "./allTranslates";
import Cookies from "js-cookie";

export const LanguageContext = createContext(null);

export const LanguageProvider = (props) => {
  const lang = Cookies.get("lang");

  const [language, setLanguage] = useState("ar");
  function getSectionLanguage() {
    return function getLanguage(name) {
      if (translates["all"][name]) {
        return translates["all"][name][language];
      } else {
      }
    };
  }
  useEffect(() => {
    if (lang && lang !== language) {
      setLanguage(lang);
    }
  }, []);
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
