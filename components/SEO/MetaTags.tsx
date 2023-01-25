/*
|--------------------------------------------------------------------------
| Meta Tag components.
|--------------------------------------------------------------------------
|
| Here you can find components that are related to the meta tags. You should
| try to include them on as many pages as possible, as they have a high
| relevance for SEO.
|
*/
import Head from "next/head";
import PropTypes from "prop-types";
import { ReactElement } from "react";
import { useAppSelector } from "@/store/hooks";
export function MetaTags({
  title,
  metaDescription,
  keywords,
  ogDescription,
  ogImage,
  ogUrl,
}): ReactElement {
  const { getAll, language } = useAppSelector((state) => state.languages);

  return (
    <Head>
      <meta name="description" content={metaDescription} key="description" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:site_name" content={getAll("Timwoork_website")} />
      <meta property="og:locale" content={language} />
      <meta property="og:locale:alternate" content={language} />
      <meta property="og:description" content={ogDescription} />
      {keywords && (
        <meta
          name="keywords"
          content={keywords.map((keyword: any) => keyword.name + ", ")}
        />
      )}
      {/* Twitter cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@timwoorkDotCom" />
      <meta name="twitter:creator" content="@timwoorkDotCom" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={ogDescription} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>
        {getAll("Logo")} | {title}
      </title>
      {ogImage && <meta property="og:image" content={ogImage} key="image" />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
    </Head>
  );
}
MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  keywords: PropTypes.array,
  ogDescription: PropTypes.string.isRequired,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
};
