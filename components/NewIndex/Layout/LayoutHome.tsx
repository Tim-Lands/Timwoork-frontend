import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import API from "../../../config";
import Cookies from "js-cookie";
import Footer from "../Footer/Footer";
function LayoutHome(props: any) {
    const [loading, setLoading] = useState(false);
    let token = Cookies.get("token");
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem("token");
    useEffect(() => {
        const handleStart = (url: any) => {
            url !== router.pathname ? setLoading(true) : setLoading(false);
        };
        const handleComplete = () => setLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    }, [router]);
    return (
        <SWRConfig
            value={{
                fetcher: async (url: string) => {
                    return await API.get(url, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                        .then((r: any) => r.data)
                        .catch(() => {
                            if (url == "api/me" && token) {
                                Cookies.remove("token");
                                if (typeof window !== undefined) {
                                    localStorage.removeItem("token");
                                    return;
                                }
                                router.reload();
                            }
                        });
                },
            }}
        >
            <Spin tip="يرجى الإنتظار..." spinning={loading}>
                {props.children}
                <Footer />
            </Spin>
        </SWRConfig>
    );
}
export default LayoutHome