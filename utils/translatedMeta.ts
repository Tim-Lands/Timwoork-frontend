import { initialState } from "store/languages/languagesSlice";

export default function getTranslatedMeta({
  title,
  metaDescription,
  ogDescription,
  ogImage,
  ogUrl,
  lang,
}: {
  title?: string;
  metaDescription?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  lang?: string;
}) {
  return {
    title: initialState.getAllByLang(title || "Timwoork_l_For", lang || "ar"),
    metaDescription: initialState.getAllByLang(
      metaDescription || "Timwoork’s_website",
      lang || "ar"
    ),
    ogDescription: initialState.getAllByLang(
      ogDescription || "Timwoork’s_website",
      lang || "ar"
    ),
    ogImage: ogImage || "/seo.png",
    ogUrl: ogUrl || `https://timwoork.com/`,
    language: lang || "ar",
  };
}
