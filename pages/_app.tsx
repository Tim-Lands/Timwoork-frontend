import "bootstrap/dist/css/bootstrap.min.css";
import i18n from "i18next";
import "antd/dist/antd.css";
import "../styles/app-rtl.css"
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
//import useSWR from "swr";
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
    useEffect(() => {
        const tt: string = i18n.dir()
        if (tt !== "rtl") {
            import("../styles/app" + ".css");
        }
    }, []);
    const getLayout = Component.getLayout ?? ((page: any) => page)
    return (
        <div>
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
