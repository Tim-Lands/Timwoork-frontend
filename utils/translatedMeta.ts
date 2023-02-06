import { initialState } from "store/languages/languagesSlice";
import cookies from "next-cookies";

export default function getTranslatedMeta({
  title,
  metaDescription,
  ogDescription,
  ogImage,
  ogUrl,
  ctx,
}: {
  title?: string;
  metaDescription?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ctx?: any;
}) {
  const lang = ctx ? cookies(ctx).lang || "ar" : "ar";
  return {
    title: initialState.getAllByLang(title || "Timwoork_l_For", lang),
    metaDescription: initialState.getAllByLang(
      metaDescription || "Timwoork’s_website",
      lang
    ),
    ogDescription: initialState.getAllByLang(
      ogDescription || "Timwoork’s_website",
      lang
    ),
    ogImage: ogImage || "/seo.png",
    ogUrl: ogUrl || `https://timwoork.com/`,
    language: lang,
  };
}
