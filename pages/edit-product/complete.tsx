import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useRef, useContext } from "react";
import { message } from "antd";
import { LanguageContext } from "../../contexts/languageContext/context";
import router from "next/router";
import Cookies from "js-cookie";
import useSWR from "swr";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import Unauthorized from "@/components/Unauthorized";
import API from "../../config";
import Link from "next/link";

function Complete({ query }) {
  let token = Cookies.get("token");
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("add_new");
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const stepsView = useRef(null);
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: getProduct }: any = useSWR(
    `api/my_products/product/${query.id}`
  );
  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;

  if (!token && !veriedEmail) return <Unauthorized />;
  if (!query) return message.error(getAll("An_error_occurred"));
  async function getProductId() {
    try {
      // const res: any =
      await API.get(`api/my_products/product/${query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // if (res.status === 200) {
      // }
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
    if (!token) {
      router.push("/login");
      return;
    }
    getProductId();
  }, []);
  async function stepFive() {
    try {
      const res = await API.post(
        `api/product/${query.id}/product-step-five`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Authentication was successful.
      if (res.status === 200) {
        message.success(getLogin("The_update_has"));
        router.push({
          pathname: "/myproducts",
          query: {
            id: query.id, // pass the id
          },
        });
      }
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
        {!getProduct && <div>{getAll("Please_wait")}</div>}

        <div className="row justify-content-md-center my-3">
          <div className="col-md-7 pt-3">
            <div className={"timlands-panel"}>
              <div className="timlands-steps-cont">
                <div className="timlands-steps">
                  <div className="timlands-step-item">
                    <h3 className="text">
                      <Link
                        href={`/edit-product/overview?id=${getProduct?.data.id}`}
                      >
                        <a>
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              collections_bookmark
                            </span>
                          </span>
                          {getLanguage("General_information")}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <div className="timlands-step-item">
                    <h3 className="text">
                      <Link
                        href={`/edit-product/prices?id=${getProduct?.data.id}`}
                      >
                        <a>
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              payments
                            </span>
                          </span>
                          {getLanguage("Upgrades_price")}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <div className="timlands-step-item">
                    <h3 className="text">
                      <Link
                        href={`/edit-product/description?id=${getProduct?.data.id}`}
                      >
                        <a>
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              description
                            </span>
                          </span>
                          {getLanguage("Description_and_instructions")}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <div className="timlands-step-item ">
                    <h3 className="text">
                      <Link
                        href={`/edit-product/medias?id=${getProduct?.data.id}`}
                      >
                        <a>
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              mms
                            </span>
                          </span>
                          {getLanguage("Gallery_and_folders")}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <div className="timlands-step-item active" ref={stepsView}>
                    <h3 className="text">
                      <Link
                        href={`/edit-product/complete?id=${getProduct?.data.id}`}
                      >
                        <a>
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              publish
                            </span>
                          </span>
                          {getLanguage("Publish_service")}
                        </a>
                      </Link>
                    </h3>
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
                  <h4 className="title">{getLanguage("The_service_has")}</h4>
                  <p className="text">
                    {getLanguage("Congratulations_Now_you")}
                  </p>
                  <div className="add-butts">
                    <button
                      onClick={() => router.back()}
                      type="button"
                      className="btn flex-center butt-primary2-out mx-1 butt-md"
                    >
                      <span className="material-icons-outlined">
                        chevron_right
                      </span>
                      <span className="text">
                        {" "}
                        {getLanguage("Previous_step")}
                      </span>
                    </button>
                    <button
                      onClick={stepFive}
                      className="btn butt-md butt-primary2 mx-1"
                    >
                      {getLanguage("Publish_service")}
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
