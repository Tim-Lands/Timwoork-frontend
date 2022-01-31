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
    //ogImage,
    //ogUrl,
}): ReactElement {
    return (
        <>
            <Head>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={title} />

                <meta name="theme-color" content="#444" />
                <meta property="og:site_name" content={title} />
                <meta property="og:locale" content="ar" />
                <meta property="og:locale:alternate" content="ar" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={ogDescription} />
        
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@KhamsatDotCom" />
                <meta name="twitter:creator" content="@KhamsatDotCom" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={metaDescription} />

                <meta property="og:url" content="https://khamsat.com/business/research-services/1251462-%D8%AF%D8%B1%D8%A7%D8%B3%D9%87-%D8%A7%D9%84%D8%AC%D8%AF%D9%88%D9%8A-%D8%A7%D9%84%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF%D9%8A%D8%A9-%D9%88%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A%D8%A9-%D9%88%D8%A7%D9%84%D8%B3%D9%88%D9%82%D9%8A%D8%A9-%D8%A7%D9%84%D8%AD%D9%82%D9%8A%D8%A8%D8%A9-%D8%A7%D9%84%D8%B4%D8%A7%D9%85%D9%84%D8%A9" />
                <meta property="og:image:height" content="470" />
                <meta property="og:image:width" content="800" />
                <meta name="image" property="og:image" content="https://khamsat.hsoubcdn.com/images/services/1049303/03c344f73fa2b3c4c548e0a9eb538cbe.jpg" />

                <meta name="image" property="og:image" content="https://khamsat.hsoubcdn.com/images/services/1049303/ff4dac9ab34104d86a0fcaa6c6af48b7.jpg" />


                <meta name="twitter:image:src" content="https://khamsat.hsoubcdn.com/images/services/1049303/ff4dac9ab34104d86a0fcaa6c6af48b7.jpg" />

                <meta name="twitter:image:src" content="https://khamsat.hsoubcdn.com/images/services/1049303/03c344f73fa2b3c4c548e0a9eb538cbe.jpg" />

                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>{title}</title>
                {/* Title

                <meta name="description" content={metaDescription} />
                
                {canonical && <meta name="canonical" content={canonical} />}

                <meta property="og:title" content={title} />
                <meta property="og:description" content={ogDescription}></meta>
                {ogImage && <meta property="og:image" content={ogImage}></meta>}
                {ogUrl && <meta property="og:url" content={ogUrl}></meta>*/}
            </Head>
        </>
    );
}
MetaTags.propTypes = {
    title: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    //canonical: PropTypes.string,
    ogDescription: PropTypes.string.isRequired,
    //ogImage: PropTypes.string,
    //ogUrl: PropTypes.string,
};
