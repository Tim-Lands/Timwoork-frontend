import i18n from "i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "@/store/store";
import { Provider } from "react-redux";
//import configureStore from "../config/configureStore";
import PropTypes from "prop-types";
import { AuthGuard } from "../services/Auth/AuthGuard";
//import { useRouter } from "next/router";
import { useEffect } from "react";
import * as types from "@/store/actionTypes";
//import { protectedRoutes } from "./../config/config";
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
//import { useTranslation } from "react-i18next";
//require('../langs/config')
import TimeAgo from 'javascript-time-ago'
//import { PersistGate } from 'redux-persist/integration/react'
//import { protectedRoutes } from "./../config";

import ar from 'javascript-time-ago/locale/ar.json'
import { ConfigProvider } from "antd";

TimeAgo.addDefaultLocale(ar)

type NextPageWithLayout = NextPage & {
    getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout, { user }: any) {

    //const router = useRouter();
    // Check if we're on a protected route.
    /*const isNoProtectedRoute = protectedRoutes.every((route) => {
        return !router.pathname.startsWith(route);
    });*/

    // Handle current user in redux.
    useEffect(() => {
        const tt: string = i18n.dir()
        if (tt == "rtl") {
            import("../styles/app-rtl" + ".css");

        } else {
            import("../styles/app" + ".css");
        }
        // Store current user if we have one.
        if (user) {
            store.dispatch({
                type: types.USER_LOADED,
                payload: user,
            });
            return;
        }
        // Dispatch user loading error if no user is present.
        store.dispatch({
            type: types.USER_LOADED_ERROR,
        });
    }, []);
    const getLayout = Component.getLayout ?? ((page: any) => page)
    return (
        <Provider store={store}>
            <ConfigProvider direction="rtl">
                {getLayout(<Component {...pageProps} />)}
            </ConfigProvider>
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

/**
 * Fetch some data server side before rendering the page client side.
 *
 * @param {object} context
 *   The context object.
 */
MyApp.getInitialProps = async ({ ctx }) => {
    const req = ctx.req;
    const pathname = ctx.pathname;
    const res = ctx.res;

    /**
     * Abort if one var is not present.
     * For example, the req obj will be undefined if we don't
     * have a page reload but a page switch via the Next Router.
     */
    if (!req || !pathname || !res) {
        return {};
    }

    const authenticator = new AuthGuard();
    return await authenticator.authenticateUser(req, res, pathname);
};
export default MyApp;
