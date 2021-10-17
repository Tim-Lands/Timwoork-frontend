import i18n from "i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { AuthGuard } from "@/services/Auth/AuthGuard";
import { useEffect } from "react";
import * as types from "@/store/actionTypes";
import TagManager from "react-gtm-module";
//import { AdvancedFooter } from "@/components/Navigation/Footer";
//import { useRouter } from "next/router";
//import { protectedRoutes } from "./../config/config";
require("./../config/config.tsx");
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { initReactI18next } from "react-i18next";
const locales = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next"
        }
    },
    ar: {
        translation: {
            "Welcome to React": "السلام عليكم"
        }
    }
}
i18n.use(initReactI18next)
    // passes i18n down to react-i18next  
    .init({
        // the translations    
        // (tip move them in a JSON file and import them,    
        // or even better, manage them via)    
        resources: locales,
        lng: "en",
        // if you're using a language detector, do not define the lng option    
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
            // react already safes from xss =>-function/interpolation#unescape    
        }
    });

type NextPageWithLayout = NextPage & {
    getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout, props: any) {
    // Initialize Google Tag Manager via react-gtm-module.
    if (process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) {
        const tagManagerArgs = {
            gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
        };
        if (process.browser) {
            TagManager.initialize(tagManagerArgs);
        }
    }

    /*const router = useRouter();
    // Check if we're on a protected route.
    /*const isNoProtectedRoute = protectedRoutes.every((route) => {
        return !router.pathname.startsWith(route);
    });*/

    // Handle current user in redux.
    useEffect(() => {
        const tt: string = i18n.dir()
        if (tt == "rtl") {
            import ("../styles/app-rtl" + ".css");

        }else {
            import ("../styles/app" + ".css");
        }
        
        // Store current user if we have one.
        if (props.user) {
            store.dispatch({
                type: types.USER_LOADED,
                payload: props.user,
            });
            return;
        }
        // Dispatch user loading error if no user is present.
        store.dispatch({
            type: types.USER_LOADED_ERROR,
        });
    }, []);
    //const { t } = useTranslation();
    // const [isDarken, setIsDarken] = useState(false)
    const getLayout = Component.getLayout ?? ((page: any) => page)
    return (
        <Provider store={store}>
            <div>
                {getLayout(<Component {...pageProps} />)}
                {/*isNoProtectedRoute && <AdvancedFooter />*/}
                
            </div>
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
