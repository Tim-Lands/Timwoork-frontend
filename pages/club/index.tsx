import Layout from "@/components/Layout/HomeLayout";
import { ReactElement, useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import router from "next/router";

function Home() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("club");
  return (
    <>
      <MetaTags title={"مجتمع تيموورك "} />
      <Result
        icon={<SmileOutlined />}
        title={getLanguage("The_forum_will")}
        extra={
          <button
            onClick={() => router.push("/")}
            className="btn butt-sm butt-primary"
          >
            {getLanguage("Go_to_Home")}
          </button>
        }
      />
    </>
  );
}
Home.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Home;
