import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/app.css";
import "../styles/app-rtl.css";
import "../styles/app-ltr.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
//import useSWR from "swr";
import { ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { PusherProvider } from "../contexts/pusherContext";
import { CurrencyProvider } from "../contexts/currencyContext";
import { LanguageProvider } from "../contexts/languageContext/context";
import InnerApp from "../components/_innerApp";
type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  // const stopBuilding = "stop Building";
  return (
    <div>
      <Provider store={store}>
        <PusherProvider>
          <CurrencyProvider>
            <LanguageProvider>
              <InnerApp innerApp={getLayout(<Component {...pageProps} />)} />
            </LanguageProvider>
          </CurrencyProvider>
        </PusherProvider>
      </Provider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
