import "bootstrap/dist/css/bootstrap.min.css";
import i18n from "i18next";
import "antd/dist/antd.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import TimeAgo from 'javascript-time-ago'
import ar from 'javascript-time-ago/locale/ar.json'
import { ConfigProvider } from "antd";
import Head from 'next/head'
import { SWRConfig } from 'swr'
import API from '../config'
import Cookies from 'js-cookie'
import LoadingScreen from "../components/LoadingScreen";
import "../styles/app-rtl.css"
TimeAgo.addDefaultLocale(ar)

type NextPageWithLayout = NextPage & {
    getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [loading, setLoading] = useState(false);
    // Check if we're on a protected route.

    // Handle current user in redux.
    useEffect(() => {
        setLoading(true);
        const tt: string = i18n.dir()
        if (tt == "rtl") {
            import("../styles/app-rtl" + ".css");
        } else {
            import("../styles/app" + ".css");
        }
        setLoading(false);
    }, []);
    const getLayout = Component.getLayout ?? ((page: any) => page)
    const token = Cookies.get('token')
    if (loading) return <LoadingScreen />
    return (
        <>
            <Head>
                <title>Timwoork</title>
            </Head>
            
            <SWRConfig value={{
                fetcher: async (url: string) => await API.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((r: any) => r.data)
            }}>
                <Provider store={store}>
                    <ConfigProvider direction="rtl">
                        {getLayout(<Component {...pageProps} />)}
                    </ConfigProvider>
                </Provider>
            </SWRConfig>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

export default MyApp;
