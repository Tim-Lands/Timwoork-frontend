import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import API from "../../config";
import { useAppSelector } from "@/store/hooks";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import { NextSeo } from "next-seo";

function LayoutHome(props: any) {
  const [loading, setLoading] = useState(false);
  const { getAll } = useAppSelector((state) => state.languages);
  const { token } = useAppSelector((state) => state.user);

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
    <>
      <NextSeo
            title="Your Title"
            description="This is a demo description"
            canonical="https://www.google.com"
            openGraph={{
              url: "https://www.example.com",
              title: "Open Graph Title",
              description: "Open Graph Description",
              images: [
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",
                  width: 800,
                  height: 600,
                  alt: "Og Image Alt",
                  type: "image/jpeg",
                },
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",

                  width: 900,
                  height: 800,
                  alt: "Og Image Alt Second",
                  type: "image/jpeg",
                },
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",
                },
                {
                  url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/play_10_year-keyword_asset-.png",
                },
              ],
              site_name: "YourSiteName",
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          return await API.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((r: any) => r.data)
            .catch(() => {
              if (url == "api/me" && token) {
                router.reload();
              }
            });
        },
      }}
    >
      <div className="hero-content" style={{ overflowX: "hidden" }}>
        <div className="container">
          <Navbar dark={props.dark} />
        </div>
      </div>
      <div className="mainHomeIndex pb-5">
        {props.children}
        {loading && (
          <div className="loading">
            <Spin tip={getAll("Loading")} spinning={true}></Spin>
          </div>
        )}
      </div>
      <Footer />
    </SWRConfig>
  </>
  );
}

export default LayoutHome;
