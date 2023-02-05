import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/app.css";
import "../styles/app-rtl.css";
import "../styles/app-ltr.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { store } from "../store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
// import Head from "next/head";
import InnerApp from "../components/_innerApp";
import { MetaTags } from "@/components/SEO/MetaTags";
type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const initialMeta = {
    title: "لبيع وشراء الخدمات المصغرة",
    metaDescription:
      "بعض أجزاء الموقع لا تفتح إلا للأعضاء المشتركين المسجلين بعد تقديم بعض المعلومات الشخصية عنهم. يوافق المشترك عند تسجيله في الموقع بأن المعلومات المدخلة من طرفه هي كاملة ودقيقة، ويلتزم بأنه لن يقوم بالتسجيل في الموقع أو يحاول دخوله منتحلاً اسم مشترك آخر ولن يستخدم اسماً قد ترى الإدارة أنه غير مناسب، مثل أرقام الهواتف، والأسماء المنتحلة لشخصيات شهيرة، وروابط المواقع، والأسماء غير المفهومة، وما في حكمها. كذلك يلتزم بعدم تسجيل أكثر من حساب واحد في موقع تيموورك وعند استخدام نفس الشخص لأكثر من حساب فإنه يعرض كافة حساباته للإيقاف بشكل نهائي. ",
    ogDescription:
      "بعض أجزاء الموقع لا تفتح إلا للأعضاء المشتركين المسجلين بعد تقديم بعض المعلومات الشخصية عنهم. يوافق المشترك عند تسجيله في الموقع بأن المعلومات المدخلة من طرفه هي كاملة ودقيقة، ويلتزم بأنه لن يقوم بالتسجيل في الموقع أو يحاول دخوله منتحلاً اسم مشترك آخر ولن يستخدم اسماً قد ترى الإدارة أنه غير مناسب، مثل أرقام الهواتف، والأسماء المنتحلة لشخصيات شهيرة، وروابط المواقع، والأسماء غير المفهومة، وما في حكمها. كذلك يلتزم بعدم تسجيل أكثر من حساب واحد في موقع تيموورك وعند استخدام نفس الشخص لأكثر من حساب فإنه يعرض كافة حساباته للإيقاف بشكل نهائي. ",
    ogImage: "/seo.png",
    ogUrl: `https://timwoork.com/`,
    language: "ar",
  };
  const metas = pageProps.meta ? pageProps.meta : initialMeta;
  return (
    <div>
      <MetaTags {...metas} />
      {/* <Head>
        <meta
          name="description"
          content={"موقع تيم ورك العالمي للعمل الحر"}
          key="description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={"موقع تيم ورك "} key="title" />
        <meta property="og:site_name" content={"موقع تيم ورك"} />
        <meta property="og:locale" content={"ar"} />
        <meta property="og:locale:alternate" content={"ar"} />
        <meta
          property="og:description"
          content={"موقع تيم ورك العالمي للعمل الحر"}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@timwoorkDotCom" />
        <meta name="twitter:creator" content="@timwoorkDotCom" />
        <meta name="twitter:title" content={"موقع تيم ورك "} />
        <meta
          name="twitter:description"
          content={"موقع تيم ورك العالمي للعمل الحر"}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{"موقع تيم ورك "}</title>
        <meta
          property="og:image"
          content={"https://timwoork.com/1.png"}
          key="image"
        />
        <meta property="og:url" content={"https://timwoork.com/"} />
      </Head> */}

      <Provider store={store()}>
        <InnerApp innerApp={getLayout(<Component {...pageProps} />)} />
      </Provider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
