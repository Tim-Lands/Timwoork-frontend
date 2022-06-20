import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/app-rtl.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
//import useSWR from "swr";
import type { ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { PusherProvider } from "../contexts/pusherContext";
import { CurrencyProvider } from "../contexts/currencyContext";
import { LanguageProvider } from "../contexts/languageContext/context";
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
        <ConfigProvider direction="rtl">
          <PusherProvider>
            <CurrencyProvider>
              <LanguageProvider>
                {getLayout(<Component {...pageProps} />)}
              </LanguageProvider>
            </CurrencyProvider>
          </PusherProvider>
        </ConfigProvider>
      </Provider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
