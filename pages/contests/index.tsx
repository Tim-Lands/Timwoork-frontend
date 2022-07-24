import React, { ReactElement } from "react";
// import { LanguageContext } from "../../contexts/languageContext/context";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import ContestSidebar from "@/components/NewIndex/Contests/ContestSidebar";
import ContestPost from "@/components/Post/ContestPost";
import ContestHeader from "@/components/NewIndex/Contests/ContestHeader";

function Index() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSettings, setIsSettings] = useState(false);
  // const { language, getSectionLanguage } = useContext(LanguageContext);
  // const getLanguage = getSectionLanguage("products");

  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"تصفح الخدمات"}
        metaDescription={"تصفح الخدمات"}
        ogDescription={"تصفح الخدمات"}
      />

      <div className="contests-container">
        <div className="row">
          <div className="col-lg-3">
            <div style={{ position: "sticky", top: 110 }}>
              <ContestSidebar />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="contests-content">
              <ContestHeader />
              <div className="row">
                <div className="col-md-4">
                  <ContestPost
                    title="هذا النص هو مثال لنص تجريبي لنص تجريبي"
                    username="aboumegouass"
                    slug="ehw-qekqwhe-qweqhwk-qwdqd"
                    author="عبد الحميد بومقواس"
                    level="بائع محترف"
                    liked={true}
                    category={"كتابة وترجمة"}
                    avatar={`/avatar.png`}
                    status={3}
                    price={103}
                    favorated={false}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد"
                    username="ahmed"
                    slug="ehw-hghvv-bhh-qwdqd"
                    author="أحمد يحيى"
                    level="بائع نشط"
                    liked={false}
                    category={"تصميم"}
                    avatar={`/avatar2.jpg`}
                    status={2}
                    price={378}
                    favorated={false}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً"
                    username="sharaf"
                    slug="ehw-qekqwhe-qweqhwk-erere"
                    author="شرف الدين المصري"
                    level="بائع محترف"
                    liked={true}
                    category={"تدريب عن بعد"}
                    avatar={`/avatar3.jpg`}
                    status={1}
                    price={76}
                    favorated={true}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="هذا النص هو مثال لنص تجريبي لنص تجريبي"
                    username="aboumegouass"
                    slug="ehw-qekqwhe-qweqhwk-qwdqd"
                    author="عبد الحميد بومقواس"
                    level="بائع محترف"
                    liked={true}
                    category={"كتابة وترجمة"}
                    avatar={`/avatar.png`}
                    status={3}
                    price={103}
                    favorated={false}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد"
                    username="ahmed"
                    slug="ehw-hghvv-bhh-qwdqd"
                    author="أحمد يحيى"
                    level="بائع نشط"
                    liked={false}
                    category={"تصميم"}
                    avatar={`/avatar2.jpg`}
                    status={2}
                    price={378}
                    favorated={false}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً"
                    username="sharaf"
                    slug="ehw-qekqwhe-qweqhwk-erere"
                    author="شرف الدين المصري"
                    level="بائع محترف"
                    liked={true}
                    category={"تدريب عن بعد"}
                    avatar={`/avatar3.jpg`}
                    status={1}
                    price={76}
                    favorated={true}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="هذا النص هو مثال لنص تجريبي لنص تجريبي"
                    username="aboumegouass"
                    slug="ehw-qekqwhe-qweqhwk-qwdqd"
                    author="عبد الحميد بومقواس"
                    level="بائع محترف"
                    liked={true}
                    category={"كتابة وترجمة"}
                    avatar={`/avatar.png`}
                    status={3}
                    price={103}
                    favorated={false}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد"
                    username="ahmed"
                    slug="ehw-hghvv-bhh-qwdqd"
                    author="أحمد يحيى"
                    level="بائع نشط"
                    liked={false}
                    category={"تصميم"}
                    avatar={`/avatar2.jpg`}
                    status={2}
                    price={378}
                    favorated={false}
                  />
                </div>
                <div className="col-md-4">
                  <ContestPost
                    title="يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً"
                    username="sharaf"
                    slug="ehw-qekqwhe-qweqhwk-erere"
                    author="شرف الدين المصري"
                    level="بائع محترف"
                    liked={true}
                    category={"تدريب عن بعد"}
                    avatar={`/avatar3.jpg`}
                    status={1}
                    price={76}
                    favorated={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Index;
