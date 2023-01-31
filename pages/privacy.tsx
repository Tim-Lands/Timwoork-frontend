import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useAppSelector } from "@/store/hooks";

function Privacy() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="py-4">
      <MetaTags
        title={"سياسة الخصوصية"}
        metaDescription={
          "يهدف بيان الخصوصية إلى مساعدتك على فهم ماهية المعلومات التي نجمعها وكيفية استخدامها في موقع تيم ورك, أكبر منصة للعمل الحر في العالم العربي."
        }
        ogDescription={
          "يهدف بيان الخصوصية إلى مساعدتك على فهم ماهية المعلومات التي نجمعها وكيفية استخدامها في موقع تيم ورك, أكبر منصة للعمل الحر في العالم العربي."
        }
      />
      <div className="container my-3">
        <div className="bg-white p-2 px-4">
          <div className="page-header">
            <h2 className="title">{getAll("Privacy_policy")}</h2>
          </div>
          <div className="page-content">
            <p className="text">{getAll("The_Website’s_administration")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Disclaimer_of_legal")}</h2>
            <p className="text">{getAll("The_Website’s_administration")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Cases_of_service")}</h2>
            <p className="text">{getAll("The_Website’s_management")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">
              {getAll("Subscriber’s_account_password")}
            </h2>

            <ul className="list">
              <li>{getAll("The_subscriber_chooses")}</li>
              <li>{getAll("The_subscriber_takes")}</li>
              <li>{getAll("The_subscriber_takes_2")}</li>
              <li>{getAll("The_subscriber_must")}</li>
              <li>{getAll("It_is_prohibited")}</li>
              <li>{getAll("It_is_strictly")}</li>
            </ul>
          </div>
          <div className="page-content">
            <h2 className="sub-title">التسجيل</h2>
            <p className="text">{getAll("Timwoork’s_website")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Content_censorship")}</h2>
            <p className="text">
              {getAll("Timwoork’s_management_reserves")}
              {getAll("All_contents_of")}
            </p>
            <br></br>
            <p className="text">{getAll("This_policy_is")}</p>
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
