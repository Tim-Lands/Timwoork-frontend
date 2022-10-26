import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useRef } from "react";
import { message } from "antd";
import router from "next/router";
import SidebarAdvices from "../../components/add-new/SidebarAdvices";
import { useAppSelector } from "@/store/hooks";

import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import Unauthorized from "@/components/Unauthorized";
import API from "../../config";

function Complete({ query }) {
  const { getAll, language } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);

  const stepsView = useRef(null);

  const veriedEmail = user.email_verified;

  if (!user.token && !veriedEmail) return <Unauthorized />;
  if (!query) return message.error(getAll("An_error_occurred"));
  async function getProductId() {
    try {
      //! check if id not exist
    } catch (error) {
      if (error.response && error.response.status === 422) {
        router.push("/add-new");
      }
      if (error.response && error.response.status === 404) {
        router.push("/add-new");
      }
    }
  }
  useEffect(() => {
    stepsView.current && stepsView.current.scrollIntoView();
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
    getProductId();
  }, [user]);
  async function stepFive() {
    try {
      await API.post(`api/product/${query.id}/product-step-five`);
      // Authentication was successful.
      message.success(getAll("The_update_has"));
      router.push({
        pathname: "/myproducts",
        query: {
          id: query.id, // pass the id
        },
      });
    } catch (error: any) {
      message.error(getAll("An_unexpected_error_occurred"));
    }
  }
  return (
    <>
      <MetaTags
        title={getAll("Add_new_service1")}
        metaDescription={getAll("Add_new_service1")}
        ogDescription={getAll("Add_new_service1")}
      />
      <div className="container-fluid">
        <div
          className="row my-3"
          style={{ maxWidth: 1300, marginInline: "auto" }}
        >
          <div className="col-md-4">
            <SidebarAdvices />
          </div>
          <div className="col-md-8 pt-3">
            <div className={"timlands-panel"}>
              <div className="timlands-steps-cont">
                <div className="timlands-steps">
                  <div className="timlands-step-item">
                    <h4 className="text">
                      <span className="icon-circular">
                        <span className="material-icons material-icons-outlined">
                          collections_bookmark
                        </span>
                      </span>
                      {getAll("General_information")}
                    </h4>
                  </div>
                  <div className="timlands-step-item">
                    <h4 className="text">
                      <span className="icon-circular">
                        <span className="material-icons material-icons-outlined">
                          payments
                        </span>
                      </span>
                      {getAll("Upgrades_price")}
                    </h4>
                  </div>
                  <div className="timlands-step-item">
                    <h4 className="text">
                      <span className="icon-circular">
                        <span className="material-icons material-icons-outlined">
                          description
                        </span>
                      </span>
                      {getAll("Description_and_instructions")}
                    </h4>
                  </div>
                  <div className="timlands-step-item">
                    <h4 className="text">
                      <span className="icon-circular">
                        <span className="material-icons material-icons-outlined">
                          mms
                        </span>
                      </span>
                      {getAll("Gallery_and_folders")}
                    </h4>
                  </div>
                  <div className="timlands-step-item active" ref={stepsView}>
                    <h4 className="text">
                      <span className="icon-circular">
                        <span className="material-icons material-icons-outlined">
                          publish
                        </span>
                      </span>
                      {getAll("Publish_service")}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="timlands-add-new">
                <div className="timlands-add-new-icon">
                  <span className="material-icons material-icons-outlined">
                    check_circle_outline
                  </span>
                </div>
                <div className="timlands-add-new-body">
                  <h4 className="title">{getAll("The_service_has")}</h4>
                  <p className="text">{getAll("Congratulations_Now_you")}</p>
                  <div className="add-butts">
                    <button
                      onClick={() => router.back()}
                      type="button"
                      className="btn flex-center butt-primary2-out mx-1 butt-md"
                    >
                      {language === "ar" ? (
                        <span className="material-icons-outlined">
                          chevron_right
                        </span>
                      ) : (
                        <span className="material-icons-outlined">
                          chevron_left
                        </span>
                      )}
                      <span className="text">{getAll("Previous_step")}</span>
                    </button>
                    <button
                      onClick={stepFive}
                      className="btn butt-md butt-primary2"
                    >
                      {getAll("Publish_service")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Complete.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Complete;

Complete.getInitialProps = ({ query }) => {
  return { query };
};
Complete.propTypes = {
  query: PropTypes.any,
};
