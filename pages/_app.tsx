import i18n from "i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import TimeAgo from 'javascript-time-ago'
import ar from 'javascript-time-ago/locale/ar.json'
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";

TimeAgo.addDefaultLocale(ar)

type NextPageWithLayout = NextPage & {
    getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {

    // Check if we're on a protected route.

    // Handle current user in redux.
    useEffect(() => {
        const tt: string = i18n.dir()
        if (tt == "rtl") {
            import("../styles/app-rtl" + ".css");

        } else {
            import("../styles/app" + ".css");
        }
        // Store current user if we have one.
        //console.log(props.user);
        
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

export default MyApp;
