import Layout from "@/components/Layout/HomeLayout";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store/hooks";

import router from "next/router";

function Home() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <>
      <MetaTags title={getAll("Timwoork_community")} />
      <Result
        icon={<SmileOutlined />}
        title={getAll("The_forum_will")}
        extra={
          <button
            onClick={() => router.push("/")}
            className="btn butt-sm butt-primary"
          >
            {getAll("Go_to_Home")}
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
