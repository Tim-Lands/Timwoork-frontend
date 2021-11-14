import i18n from "i18next";
import "bootstrap/dist/css/bootstrap.min.css";
//import store from "@/store/store";
import { Provider } from "react-redux";
import configureStore from "../config/configureStore";
import PropTypes from "prop-types";
import { useEffect } from "react";
//import * as types from "@/store/actionTypes";
//import { AdvancedFooter } from "@/components/Navigation/Footer";
//import { useRouter } from "next/router";
//import { protectedRoutes } from "./../config/config";
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
//import { useTranslation } from "react-i18next";
//require('../langs/config')
import TimeAgo from 'javascript-time-ago'
import { PersistGate } from 'redux-persist/integration/react'

import ar from 'javascript-time-ago/locale/ar.json'

TimeAgo.addDefaultLocale(ar)

type NextPageWithLayout = NextPage & {
    getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const { store, persistor } = configureStore()
    // Handle current user in redux.
    useEffect(() => {
        const tt: string = i18n.dir()
        if (tt == "rtl") {
            import ("../styles/app-rtl" + ".css");

        }else {
            import ("../styles/app" + ".css");
        }
    }, []);
    const getLayout = Component.getLayout ?? ((page: any) => page)
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {getLayout(<Component {...pageProps} />)}
            </PersistGate>
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};
export default MyApp;
