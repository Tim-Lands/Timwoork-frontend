import { createContext, useState } from "react";
import translates from "./allTranslates";

export const LanguageContext = createContext(null);

export const LanguageProvider = (props) => {
  const [language, setLanguage] = useState("ar");
  function getSectionLanguage(section) {
    return function getLanguage(name) {
      return translates[section][name][language];
    };
  }
  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, getSectionLanguage }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
