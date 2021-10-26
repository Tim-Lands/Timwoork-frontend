import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './en/en.json'
import ar from './ar/ar.json'
const locales = {
    en: {
        translation: en
        
    },
    ar: {
        translation: ar
    }
}
i18n.use(initReactI18next)
    // passes i18n down to react-i18next  
    .init({
        // the translations    
        // (tip move them in a JSON file and import them,    
        // or even better, manage them via)    
        resources: locales,
        lng: "ar",
        // if you're using a language detector, do not define the lng option    
        fallbackLng: "ar",
        interpolation: {
            escapeValue: false
            // react already safes from xss =>-function/interpolation#unescape    
        }
    });