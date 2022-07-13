import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";
function About() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("all");
  return (
    <div className="py-4">
      <MetaTags
        title={getLanguage("About_Timwoork")}
        metaDescription={getLanguage("Timwoork_is_an")}
        ogDescription={getLanguage("Timwoork_is_an")}
      />
      <div className="container my-3">
        <div className="bg-white p-2 px-3">
          <div className="page-header">
            <h2 className="title">{getLanguage("About_Timwoork")}</h2>
          </div>
          <div className="page-content">
            <p className="text">{getLanguage("Timwoork_is_an_2")}</p>
            <p className="text">{getLanguage("Timwoork_was_created")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("How_does_the")}</h2>
            <p className="text">{getLanguage("Micro_services_act")}</p>
            <p className="text">
              {getLanguage("read")}
              <a href="/terms">{getLanguage("Terms_of_use")} </a>
              <a href="/privacy"> {getLanguage("Privacy")} </a>
              {getLanguage("Carefully_the")}
            </p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("Service_provider")}</h2>
            <p className="text">{getLanguage("To_add_a")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("Register_a_new")}</h2>
            <p className="text">{getLanguage("There_are_tips")}</p>
            <ol className="list">
              <li>{getLanguage("Register_with_your")}</li>
              <li>{getLanguage("Make_sure_that")}</li>
              <li>{getLanguage("Try_to_use")}</li>
              <li>{getLanguage("You_can_later")}</li>
              <li>{getLanguage("Try_to_provide")}</li>
              <li>{getLanguage("Write_your_service")}</li>
              <li>{getLanguage("Be_sincere_and")}</li>
              <li>{getLanguage("Set_the_number")}</li>
              <li>{getLanguage("Do_not_submit")}</li>
              <li>{getLanguage("Write_in_detail")}</li>
              <li>{getLanguage("Be_aware_that")}</li>
              <li>{getLanguage("Do_not_copy")}</li>
              <li>{getLanguage("If_you_like")}</li>
              <li>{getLanguage("The_picture_you")}</li>
              <li>{getLanguage("It_is_strictly")}</li>
              <li>{getLanguage("Choose_a_title")}</li>
              <li>{getLanguage("Provide_a_description")}</li>
              <li>{getLanguage("You_must_include")}</li>
              <li>{getLanguage("When_a_buyer")}</li>
              <li>{getLanguage("When_you_receive")}</li>
              <li>{getLanguage("After_you_have")}</li>
              <li>{getLanguage("If_the_buyer")}</li>
              <li>{getLanguage("In_the_case")}</li>
              <li>{getLanguage("The_sellers_of")}</li>
              <li>{getLanguage("When_converting_the")}</li>
              <li>{getLanguage("When_featured_service")}</li>
              <li>{getLanguage("When_you_transfer")}</li>
              <li>
                {getLanguage("The_minimum_withdrawal")}
                <ul className="list">
                  <li>{getLanguage("When_withdrawing_profits")}</li>
                  <li>{getLanguage("When_withdrawing_profits_2")}</li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="page-content">
            <h2 className="sub-title">
              {getLanguage("When_withdrawing_profits_2")}
            </h2>
            <p className="text">{getLanguage("Timwoork_guarantees_buyers")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("Service_Requester")}</h2>
            <ol className="list">
              <li>{getLanguage("Browse_the_Timwoork")}</li>
              <li>{getLanguage("If_you_don’t")}</li>
              <li>{getLanguage("Click_on_the")}</li>
              <li>{getLanguage("You_can_purchase")}</li>
              <li>{getLanguage("After_purchasing_the")}</li>
              <li>{getLanguage("When_the_seller")}</li>
              <li>{getLanguage("If_the_work")}</li>
              <li>{getLanguage("In_the_case_2")}</li>
              <li>{getLanguage("In_the_case_3")}</li>
              <li>{getLanguage("When_the_seller_2")}</li>
              <li> {getLanguage("Do_not_eceive")}</li>
            </ol>
            <p className="text">
              {getLanguage("Read_the_service")}
              {getLanguage("And_in_the")}
            </p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getLanguage("Ask_the_seller")}
            </h2>
            <p className="text">{getLanguage("If_you_find")}</p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getLanguage("Check_the_service")}
            </h2>
            <p className="text">{getLanguage("If_the_seller")}</p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getLanguage("You_can_request")}
            </h2>
            <p className="text">{getLanguage("If_you_find_2")}</p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getLanguage("Get_your_money")}
            </h2>
            <p className="text">{getLanguage("If_the_seller_2")}</p>
            <p className="text">{getLanguage("Stick_to_the")}</p>
            <p className="text">
              {getLanguage("After_sending_the")}
              {getLanguage("Do_not_cancel")}
            </p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("Service_Provider")}</h2>
            <p className="text">{getLanguage("Make_sure_to")}</p>
            <p className="text">{getLanguage("Set_an_appropriate_2")}</p>
            <p className="text">{getLanguage("Do_not_place")}</p>
            <p className="text">{getLanguage("It_does_not")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getLanguage("What_levels_are")}</h2>
            <ul className="list">
              <li className="title">
                {getLanguage("Sellers")}
                <ol className="list">
                  <li style={{ fontWeight: 300 }}>
                    {getLanguage("New_seller")}
                    <ul className="list">
                      <li>{getLanguage("He_can_add")}</li>
                      <li>{getLanguage("Activate_the_service")}</li>
                    </ul>
                  </li>
                  <li style={{ fontWeight: 300 }}>
                    {getLanguage("Active_seller")}
                    <ul className="list">
                      <li>{getLanguage("Has_finished_and")}</li>
                      <li>{getLanguage("Can_add_a")}</li>
                      <li>{getLanguage("Activate_the_service_2")}</li>
                      <li>{getLanguage("Can_add_a_brief")}</li>
                      <li>{getLanguage("Faster_Technical_Support")}</li>
                    </ul>
                  </li>
                  <li style={{ fontWeight: 300 }}>
                    {getLanguage("Featured_Seller")}
                    <ul className="list">
                      <li>{getLanguage("Had_completed_and")}</li>
                      <li>{getLanguage("Can_add_a_2")}</li>
                      <li>{getLanguage("Activate_the_service_3")}</li>
                      <li>{getLanguage("Can_add_a_3")}</li>
                      <li>{getLanguage("Priority_in_technical_support")}</li>
                    </ul>
                  </li>
                  <li style={{ fontWeight: 300 }}>
                    {getLanguage("Trusted_seller")}
                    <br />
                    {getLanguage("The_account_of")}
                    <ul className="list">
                      <li>{getLanguage("Possibility_to_add")}</li>
                      <li>{getLanguage("Il_peut_aussi")}</li>
                      <li>{getLanguage("Add_a_trusted")}</li>
                      <li>{getLanguage("Can_add_a_4")}</li>
                      <li>{getLanguage("Priority_in_technical")}</li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li className="title">
                {getLanguage("Buyers")}
                <ol className="list">
                  <li>
                    {getLanguage("New_buyer")}
                    <br />
                    {getLanguage("The_use_made_2")}
                  </li>
                  <li>
                    {getLanguage("Serious_Buyer")}
                    <br />
                    قام المستخدم بعمليات شرائية بقيمة [100 - 299] دولار.
                  </li>
                  <li>
                    {getLanguage("Featured_Buyer")}
                    <br />
                    {getLanguage("The_user_made")}
                  </li>
                  <li>
                    {getLanguage("VIP_Buyer")}
                    <br />
                    {getLanguage("This_level_is")}
                  </li>
                </ol>
              </li>
            </ul>
            <p className="text">{getLanguage("Currently_the_user")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
About.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default About;
