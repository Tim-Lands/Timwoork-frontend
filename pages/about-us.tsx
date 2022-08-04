import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";
function About() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <div className="py-4">
      <MetaTags
        title={getAll("About_Timwoork")}
        metaDescription={getAll("Timwoork_is_an")}
        ogDescription={getAll("Timwoork_is_an")}
      />
      <div className="container my-3">
        <div className="bg-white p-2 px-3">
          <div className="page-header">
            <h2 className="title">{getAll("About_Timwoork")}</h2>
          </div>
          <div className="page-content">
            <p className="text">{getAll("Timwoork_is_an_2")}</p>
            <p className="text">{getAll("Timwoork_was_created")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("How_does_the")}</h2>
            <p className="text">{getAll("Micro_services_act")}</p>
            <p className="text">
              {getAll("read")}
              <a href="/terms">{getAll("Terms_of_use")} </a>
              <a href="/privacy"> {getAll("Privacy")} </a>
              {getAll("Carefully_the")}
            </p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Service_provider")}</h2>
            <p className="text">{getAll("To_add_a")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Register_a_new")}</h2>
            <p className="text">{getAll("There_are_tips")}</p>
            <ol className="list">
              <li>{getAll("Register_with_your")}</li>
              <li>{getAll("Make_sure_that")}</li>
              <li>{getAll("Try_to_use")}</li>
              <li>{getAll("You_can_later")}</li>
              <li>{getAll("Try_to_provide")}</li>
              <li>{getAll("Write_your_service")}</li>
              <li>{getAll("Be_sincere_and")}</li>
              <li>{getAll("Set_the_number")}</li>
              <li>{getAll("Do_not_submit")}</li>
              <li>{getAll("Write_in_detail")}</li>
              <li>{getAll("Be_aware_that")}</li>
              <li>{getAll("Do_not_copy")}</li>
              <li>{getAll("If_you_like")}</li>
              <li>{getAll("The_picture_you")}</li>
              <li>{getAll("It_is_strictly")}</li>
              <li>{getAll("Choose_a_title")}</li>
              <li>{getAll("Provide_a_description")}</li>
              <li>{getAll("You_must_include")}</li>
              <li>{getAll("When_a_buyer")}</li>
              <li>{getAll("When_you_receive")}</li>
              <li>{getAll("After_you_have")}</li>
              <li>{getAll("If_the_buyer")}</li>
              <li>{getAll("In_the_case")}</li>
              <li>{getAll("The_sellers_of")}</li>
              <li>{getAll("When_converting_the")}</li>
              <li>{getAll("When_featured_service")}</li>
              <li>{getAll("When_you_transfer")}</li>
              <li>
                {getAll("The_minimum_withdrawal")}
                <ul className="list">
                  <li>{getAll("When_withdrawing_profits")}</li>
                  <li>{getAll("When_withdrawing_profits_2")}</li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="page-content">
            <h2 className="sub-title">
              {getAll("When_withdrawing_profits_2")}
            </h2>
            <p className="text">{getAll("Timwoork_guarantees_buyers")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Service_Requester")}</h2>
            <ol className="list">
              <li>{getAll("Browse_the_Timwoork")}</li>
              <li>{getAll("If_you_don’t")}</li>
              <li>{getAll("Click_on_the")}</li>
              <li>{getAll("You_can_purchase")}</li>
              <li>{getAll("After_purchasing_the")}</li>
              <li>{getAll("When_the_seller")}</li>
              <li>{getAll("If_the_work")}</li>
              <li>{getAll("In_the_case_2")}</li>
              <li>{getAll("In_the_case_3")}</li>
              <li>{getAll("When_the_seller_2")}</li>
              <li> {getAll("Do_not_eceive")}</li>
            </ol>
            <p className="text">
              {getAll("Read_the_service")}
              {getAll("And_in_the")}
            </p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getAll("Ask_the_seller")}
            </h2>
            <p className="text">{getAll("If_you_find")}</p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getAll("Check_the_service")}
            </h2>
            <p className="text">{getAll("If_the_seller")}</p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getAll("You_can_request")}
            </h2>
            <p className="text">{getAll("If_you_find_2")}</p>
            <h2 className="sub-title" style={{ marginTop: 12 }}>
              {getAll("Get_your_money")}
            </h2>
            <p className="text">{getAll("If_the_seller_2")}</p>
            <p className="text">{getAll("Stick_to_the")}</p>
            <p className="text">
              {getAll("After_sending_the")}
              {getAll("Do_not_cancel")}
            </p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Service_Provider")}</h2>
            <p className="text">{getAll("Make_sure_to")}</p>
            <p className="text">{getAll("Set_an_appropriate_2")}</p>
            <p className="text">{getAll("Do_not_place")}</p>
            <p className="text">{getAll("It_does_not")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("What_levels_are")}</h2>
            <ul className="list">
              <li className="title">
                {getAll("Sellers")}
                <ol className="list">
                  <li style={{ fontWeight: 300 }}>
                    {getAll("New_seller")}
                    <ul className="list">
                      <li>{getAll("He_can_add")}</li>
                      <li>{getAll("Activate_the_service")}</li>
                    </ul>
                  </li>
                  <li style={{ fontWeight: 300 }}>
                    {getAll("Active_seller")}
                    <ul className="list">
                      <li>{getAll("Has_finished_and")}</li>
                      <li>{getAll("Can_add_a")}</li>
                      <li>{getAll("Activate_the_service_2")}</li>
                      <li>{getAll("Can_add_a_brief")}</li>
                      <li>{getAll("Faster_Technical_Support")}</li>
                    </ul>
                  </li>
                  <li style={{ fontWeight: 300 }}>
                    {getAll("Featured_Seller")}
                    <ul className="list">
                      <li>{getAll("Had_completed_and")}</li>
                      <li>{getAll("Can_add_a_2")}</li>
                      <li>{getAll("Activate_the_service_3")}</li>
                      <li>{getAll("Can_add_a_3")}</li>
                      <li>{getAll("Priority_in_technical_support")}</li>
                    </ul>
                  </li>
                  <li style={{ fontWeight: 300 }}>
                    {getAll("Trusted_seller")}
                    <br />
                    {getAll("The_account_of")}
                    <ul className="list">
                      <li>{getAll("Possibility_to_add")}</li>
                      <li>{getAll("Il_peut_aussi")}</li>
                      <li>{getAll("Add_a_trusted")}</li>
                      <li>{getAll("Can_add_a_4")}</li>
                      <li>{getAll("Priority_in_technical")}</li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li className="title">
                {getAll("Buyers")}
                <ol className="list">
                  <li>
                    {getAll("New_buyer")}
                    <br />
                    {getAll("The_use_made_2")}
                  </li>
                  <li>
                    {getAll("Serious_Buyer")}
                    <br />
                    قام المستخدم بعمليات شرائية بقيمة [100 - 299] دولار.
                  </li>
                  <li>
                    {getAll("Featured_Buyer")}
                    <br />
                    {getAll("The_user_made")}
                  </li>
                  <li>
                    {getAll("VIP_Buyer")}
                    <br />
                    {getAll("This_level_is")}
                  </li>
                </ol>
              </li>
            </ul>
            <p className="text">{getAll("Currently_the_user")}</p>
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
