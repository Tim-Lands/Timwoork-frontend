import "../styles/chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import i18n from "i18next";
import "antd/dist/antd.css";
import "../styles/fonts.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import useSWR from "swr";
import { useEffect } from "react";
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ConfigProvider } from "antd";
import { SWRConfig } from 'swr'
import API from '../config'
import Cookies from 'js-cookie'
//import Echo from 'laravel-echo';

type NextPageWithLayout = NextPage & {
    getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const { data: userData }: any = useSWR(`api/me`)
    const dataDark = userData && userData.user_details.profile.dark_mode
    const token = Cookies.get('token')
    /*const options = {
        broadcaster: 'pusher',
        key: '510f53f8ccb3058a96fc',
        cluster: 'eu',
        //forceTLS: config.pusher.tls,
        //authEndpoint is your apiUrl + /broadcasting/auth
        authEndpoint: 'https://api.icoursat.com/api/broadcasting/auth',
        // As I'm using JWT tokens, I need to manually set up the headers.
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        },
    };
    const echo = new Echo(options);
    echo.private('conversations.1')
        .listen('message.sent', (e) => {
            console.log(e)
        });*/
    // Check if we're on a protected route.

    // Handle current user in redux.
    useEffect(() => {
        const tt: string = i18n.dir()
        if (tt == "rtl") {
            import("../styles/app-rtl" + ".css");
        } else {
            import("../styles/app" + ".css");
        }
        if (dataDark == 1) {
            import("../styles/is-dark" + ".css");
        }
    }, []);
    const getLayout = Component.getLayout ?? ((page: any) => page)
    return (
        <div className={'mt-2 pt-5' + (dataDark == 1 ? ' is-dark' : '')}>
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
        </div>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

export default MyApp;
