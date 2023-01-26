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
