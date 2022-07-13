import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";

function Privacy() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("all");
  return (
    <div className="py-4">
      <MetaTags
        title={getLanguage("Privacy_policy")}
        metaDescription={getLanguage("Arabic_text_you")}
        ogDescription={getLanguage("Arabic_text_you")}
      />
      <div className="container my-3">
        <div className="bg-white p-2 px-4">
          <div className="page-header">
            <h2 className="title">{getLanguage("Privacy_policy")}</h2>
          </div>
          <div className="page-content">
            <p className="text">
              {getLanguage("The_Website’s_administration")}
            </p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("Disclaimer_of_legal")}</h2>
            <p className="text">
              {getLanguage("The_Website’s_administration")}
            </p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("Cases_of_service")}</h2>
            <p className="text">{getLanguage("The_Website’s_management")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">
              {getLanguage("Subscriber’s_account_password")}
            </h2>

            <ul className="list">
              <li>{getLanguage("The_subscriber_chooses")}</li>
              <li>{getLanguage("The_subscriber_takes")}</li>
              <li>{getLanguage("The_subscriber_takes_2")}</li>
              <li>{getLanguage("The_subscriber_must")}</li>
              <li>{getLanguage("It_is_prohibited")}</li>
              <li>{getLanguage("It_is_strictly")}</li>
            </ul>
          </div>
          <div className="page-content">
            <h2 className="sub-title">التسجيل</h2>
            <p className="text">{getLanguage("Timwoork’s_website")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("Content_censorship")}</h2>
            <p className="text">
              {getLanguage("Timwoork’s_management_reserves")}
              {getLanguage("All_contents_of")}
            </p>
            <br></br>
            <p className="text">{getLanguage("This_policy_is")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
Privacy.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Privacy;
