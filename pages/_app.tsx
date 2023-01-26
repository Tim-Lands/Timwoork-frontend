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
import InnerApp from "../components/_innerApp";
import { NextSeo } from "next-seo";
type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <div>
        <NextSeo
            title="Your Title"
            description="This is a demo description"
            canonical="https://www.google.com"
            openGraph={{
              url: "https://www.example.com",
              title: "Open Graph Title",
              description: "Open Graph Description",
              images: [
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",
                  width: 800,
                  height: 600,
                  alt: "Og Image Alt",
                  type: "image/jpeg",
                },
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",

                  width: 900,
                  height: 800,
                  alt: "Og Image Alt Second",
                  type: "image/jpeg",
                },
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",
                },
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",
                },
              ],
              site_name: "YourSiteName",
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />
      <Provider store={store}>
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
