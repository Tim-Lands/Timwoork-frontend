import Navbar from "@/components/Header/Navbar";
import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { useAppSelector } from "@/store/hooks";
import { NextSeo } from "next-seo";

function Layout(props: any) {
  const [loading, setLoading] = useState(false);
  const { getAll } = useAppSelector((state) => state.languages);
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
    <div className="pt-5 mainHomeIndex">
      <Navbar />
      {props.children}
      {loading && (
        <div className="loading">
          <Spin tip={getAll("Loading")} spinning={true}></Spin>
        </div>
      )}
      <Footer />
    </div>
    </>
  );
}
export default Layout;
// const mapStateToProps = (state: any) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { logout })(Layout);
