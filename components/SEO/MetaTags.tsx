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

export function MetaTags({
    title,
    metaDescription,
    //canonical,
    ogDescription,
    ogImage,
    ogUrl,
}): ReactElement {
    return (
        <>
            <Head>
                <meta name="description" content={metaDescription} key="description" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} key="title" />
                <meta property="og:description" content={ogDescription} />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>تيموورك | {title}</title>
                {ogImage && <meta property="og:image" content={ogImage} key="image" />}
                {ogUrl && <meta property="og:url" content={ogUrl} />}
            </Head>
        </>
    );
}
MetaTags.propTypes = {
    title: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    //canonical: PropTypes.string,
    ogDescription: PropTypes.string.isRequired,
    ogImage: PropTypes.string,
    ogUrl: PropTypes.string,
};
