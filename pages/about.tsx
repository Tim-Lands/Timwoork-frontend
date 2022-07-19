import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";

function About() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");

  return (
    <>
      <div className="about-hero">
        <div className="container">
          <h1 className="title">{getLanguage("About_Timwoork")}</h1>
          <p className="text">{getLogin("This_text_is_2")}</p>
        </div>
      </div>
      <div className="py-4">
        <MetaTags
          title='{getLanguage("About_Timwoork")}'
          metaDescription={getLanguage("Arabic_text_you")}
          ogDescription={getLanguage("Arabic_text_you")}
        />
        <div className="container">
          <div className="bg-white p-2 px-4">
            <div className="page-header">
              <h2 className="title">{getLanguage("About_Timwoork")}</h2>
            </div>
            <div className="page-content">
              <h2 className="sub-title">زيادة عدد الحروف</h2>
              <p className="text">
                {getLogin("This_text_is_2")}
                {getLogin("If_you_need")}للعميل الشكل كاملاً،دور مولد النص
                العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له
                بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. هذا النص
                يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص
                منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً
                بديلاً ومؤقتاً.
              </p>
            </div>
            <div className="page-content">
              <h2 className="sub-title">زيادة عدد الحروف</h2>

              <ul className="list">
                <li>{getLanguage("The_subscriber_chooses")}</li>
                <li>{getLanguage("The_subscriber_takes")}</li>
                <li>{getLanguage("The_subscriber_takes_2")}</li>
                <li>{getLanguage("The_subscriber_must")}</li>
                <li>{getLanguage("Il_est_interdit")}</li>
                <li>{getLanguage("It_is_strictly_2")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
About.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default About;
