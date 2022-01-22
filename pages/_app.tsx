import "../styles/chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import i18n from "i18next";
import "antd/dist/antd.css";
import "../styles/app-rtl.css"
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import useSWR from "swr";
import { useEffect } from "react";
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ConfigProvider } from "antd";

type NextPageWithLayout = NextPage & {
    getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const { data: userData }: any = useSWR(`api/me`)
    const dataDark = userData && userData.user_details.profile.dark_mode

    // Check if we're on a protected route.

    // Handle current user in redux.
    useEffect(() => {

        const tt: string = i18n.dir()
        if (tt !== "rtl") {
            import("../styles/app" + ".css");
        }
    }, []);
    const getLayout = Component.getLayout ?? ((page: any) => page)
    return (
        <div className={dataDark == 1 ? ' is-dark' : ''}>
            <Provider store={store}>
                <ConfigProvider direction="rtl">
                    {getLayout(<Component {...pageProps} />)}
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
