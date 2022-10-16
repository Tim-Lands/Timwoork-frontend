import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useAppSelector } from "@/store/hooks";

function Terms() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="py-4">
      <MetaTags
        title={getAll("Terms_of_use")}
        metaDescription={getAll("Services_are_provided")}
        ogDescription={getAll("Services_are_provided")}
      />
      <div className="container my-3">
        <div className="bg-white p-2 px-4">
          <div className="page-header">
            <h2 className="title">{getAll("Terms_of_use")}</h2>
          </div>
          <div className="page-content">
            <p className="text">
              {getAll("The_following_terms")}
              {getAll("Furthermore_by_applying")}{" "}
              {getAll("Access_nd_membership")}
            </p>
            <p className="text">{getAll("To_enjoy_all")}</p>
            <p className="text">{getAll("To_complete_the")}</p>
            <p className="text">{getAll("Timwoork_may_change")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Disclaimer_of_legal")}</h2>
            <p className="text">{getAll("The_user_acknowledges")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("On_site_service")}</h2>
            <p className="text">{getAll("The_Website’s_management")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">المحتوى:</h2>
            <p className="text">
              {getAll("All_content")}
              {getAll("Timwoork_respects_intellectual")}
            </p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Timwoork_reserves_the")}</h2>
            <ol className="list">
              <li>{getAll("Immediately_suspend_your")}</li>
              <li>{getAll("Remove_block_and")}</li>
            </ol>
            <p className="text">{getAll("When_we_receive")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Services_use")}</h2>
            <p className="text">{getAll("We_grant_you")}</p>
            <br />
            <h5>{getAll("You_agree_not")}</h5>
            <ol className="list">
              <li>{getAll("To_send_receive")}</li>
              <li>{getAll("To_engage_in")}</li>
            </ol>
            <p className="text">{getAll("Follow_the_brands")}</p>
            <br />
            <h5>{getAll("You_may_not")}</h5>
            <ol className="list">
              <li>{getAll("In_or_all")}</li>
              <li>{getAll("For_activities_products")}</li>
              <li>{getAll("In_a_way")}</li>
              <li>{getAll("In_a_way_that")}</li>
            </ol>
            <p className="text">{getAll("Timwoork_reserves_the_2")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Share_your_ideas")}</h2>
            <p className="text">{getAll("We_like_your")}</p>
            <br />
            <h2 className="sub-title">{getAll("Communication_methods")}</h2>
            <p className="text">{getAll("Timwoork_will_provide")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">
              {getAll("Subscriber’s_account_password")}
            </h2>

            <ul className="list">
              <li>{getAll("The_subscriber_chooses")}</li>
              <li>{getAll("The_subscriber_takes")}</li>
              <li>{getAll("The_user_is")}</li>
              <li>{getAll("The_subscriber_must")}</li>
              <li>{getAll("It_is_prohibited")}</li>
              <li>{getAll("It_is_strictly")}</li>
            </ul>
          </div>
          <div className="page-content">
            <h2 className="sub-title">
              {getAll("Receiving_notifications_and")}
            </h2>
            <p className="text">{getAll("Alerts_and_notifications")}</p>
          </div>

          <div className="page-content">
            <h2 className="sub-title">
              {getAll("Timwoorks_account_suspension")}
            </h2>

            <ul className="list">
              <li>{getAll("Any_violation_of")}</li>
              <li>{getAll("Damage_the_Timwoork")}</li>
              <li>{getAll("Use_profanity_or")}</li>
              <li>{getAll("Register_on_the")}</li>
              <li>{getAll("Use_direct_communication")}</li>
              <li>{getAll("Sinscrire_avec_plus")}</li>
              <li>{getAll("Write_spam_topics")}</li>
              <li>{getAll("If_an_impersonation")}</li>
              <li>{getAll("Many_complaints_from")}</li>
              <li>{getAll("In_the_case_4")}</li>
              <li>{getAll("Pay_on_the")}</li>
              <li>{getAll("Deliver_the_service")}</li>
              <li>{getAll("Exploit_the_seller")}</li>
              <li>{getAll("The_buyer_requesting")}</li>
              <li>{getAll("The_users_choice")}</li>
              <li>{getAll("Sell_a_user")}</li>
              <li>{getAll("Delete_or_stop")}</li>
              <li>{getAll("When_a_man")}</li>
              <li>{getAll("The_seller_who")}</li>
              <li>{getAll("When_a_buyer_2")}</li>
            </ul>
            <p className="text">{getAll("In_some_cases")}</p>
            <p className="text">{getAll("If_a_users")}</p>
          </div>

          <div className="page-content">
            <h2 className="sub-title">{getAll("How_to_avoid")}</h2>
            <p className="text">{getAll("Timwoork_has_the")}</p>
            <h5>{getAll("When_adding_any")}</h5>
            <ul className="list">
              <li>{getAll("No_poor_service")}</li>
              <li>{getAll("Write_in_good")}</li>
              <li>{getAll("Use_a_clear")}</li>
              <li>{getAll("Use_a_good")}</li>
              <li>{getAll("Develop_a_sufficient")}</li>
              <li>{getAll("All_service_properties")}</li>
              <li>{getAll("Do_not_repeat")}</li>
              <li>{getAll("For_services_such")}</li>
              <li>{getAll("Concerning_financial_services")}</li>
            </ul>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("The_following_services")}</h2>
            <ul className="list">
              <li>
                الخدمات المكتوبة بلغة غير اللغة العربية الفصحى أو بلهجة محلية.
              </li>
              <li>
                {" "}
                الخدمات السياسية، الطائفية .والخدمات المخالفة للقوانين العامة
                وأنظمة الدول، وشروط المواقع الأخرى المتعلقة بها، أو تعاليم
                الإسلام.
              </li>
              <li>
                الخدمات التي تسبب الضرر لموقع تيم ورك أو مستخدميه بشكل مباشر أو
                غير مباشر.
              </li>
              <li>
                خدمات بيع المواقع والصفحات والحسابات في المواقع التي تمنع ذلك،
                كصفحات الفيسبوك وحسابات تويتر، حسابات جوجل أدسنس الجاهزة وما إلى
                ذلك.
              </li>
              <li>
                خدمات الفتاوى والرقى الشرعية والخدمات المتعلقة بها لعدم إمكانية
                ضمان تقديمها من أهل الاختصاص.
              </li>
              <li>الخدمات المنخفضة الجودة.</li>
              <li>الخدمات المنسوخة بشكل كامل من مستخدمين آخرين.</li>
              <li>الخدمات المالية المتعلقة بعملة Bitcoin.</li>
              <li>
                خدمات تقديم بطاقات الفيزا الإفتراضية أو الحقيقية، كذلك خدمات
                تفعيل باي بال وما يتعلق به.
              </li>
              <li>الخدمات التي تنتهك حقوق الملكية الفكرية.</li>
              <li>
                البرامج والكتب والمنتجات المقرصنة وكراكات البرامج وكل ماينتهك
                حقوق الآخرين.
              </li>
              <li>
                خدمات السبام والإزعاج، كخدمات إرسال آلاف الرسائل البريدية أو بيع
                البرامج والسكريبتات التي تقوم بذلك.
              </li>
              <li>
                خدمات جلب الزوار بطرق غير شرعية مثل الاعتماد على مواقع السبام أو
                مواقع التبادل، أو خدمات جلب زوار أو معجبين أو متابعين وهميين.
              </li>
              <li>الخدمات التي تؤدي إلى التعامل والدفع خارج موقع تيم ورك.</li>
              <li>الخدمات التي تباع مرة واحدة فقط.</li>
              <li>
                الخدمات التي تنفذ على فترة طويلة جدا أكثر من شهر، مثل الاستضافة
                وشراء نطاق لمدة سنة وغيرها، وموقع تيم ورك لا يمكنه تقديم ضمان
                لها.
              </li>
              <li>خدمات الفوركس، التسويق الهرمي والشبكي.</li>
              <li>خدمات التسويق بالعمولة لمواقع أخرى.</li>
              <li>
                خدمات الإستشارة والعلاج الطبي، ﻷنها تسبب الأذى إن لم يكن مقدم
                الخدمة طبيبا متمرساً. إضافة إلى أن الكشف الطبي الفيزيائي هو
                الأفضل للتشخيص السليم.
              </li>
              <li>
                خدمات جلب التصويتات أو زيادة التصويت في مواقع التصويت والجوائز
                وغيرها.
              </li>
            </ul>
          </div>

          <div className="page-content">
            <h2 className="sub-title">
              شروط إستخدام صفحات التواصل العامة بين الأعضاء في الموقع:
            </h2>
            <p className="text">
              في حال المخالفة المتكررة لهذه الشروط قد يصار إلى إيقاف حساب
              المستخدم المخالف
            </p>
            <ul className="list">
              <li>{getAll("Services_written_in")}</li>
              <li>{getAll("Use_clear_and")}</li>
              <li>{getAll("Do_not_repeat_2")}</li>
              <li>{getAll("Do_not_offend")}</li>
              <li>{getAll("Do_not_use")}</li>
              <li>{getAll("ost_links_or")}</li>
              <li>{getAll("Request_certain_services")}</li>
            </ul>
          </div>

          <div className="page-content">
            <h2 className="sub-title">{getAll("Users_protection")}</h2>
            <p className="text">{getAll("To_protect_its")}</p>
            <ol className="list">
              <li>{getAll("Protect_any_user")}</li>
              <li>{getAll("Follow_users_activities")}</li>
              <li>{getAll("If_a_report")}</li>
              <li>{getAll("Registering_any_user")}</li>
              <li>{getAll("The_Website_management")}</li>
            </ol>
            <p className="text">{getAll("Furthermore_none_of")}</p>
          </div>

          <div className="page-content">
            <p className="text">{getAll("This_policy_is")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
Terms.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Terms;
