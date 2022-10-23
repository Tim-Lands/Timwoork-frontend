import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useRef } from "react";
import { message } from "antd";
import { useAppSelector } from "@/store/hooks";

import router from "next/router";
import useSWR from "swr";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import Unauthorized from "@/components/Unauthorized";
import API from "../../config";
import Link from "next/link";

function Complete({ query }) {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);

  const stepsView = useRef(null);
  const { data: getProduct }: any = useSWR(
    `api/my_products/product/${query.id}`
  );
  const veriedEmail = user.email_verified;

  if (!user.isLogged && !veriedEmail) return <Unauthorized />;
  if (!query) return message.error(getAll("An_error_occurred"));
  async function getProductId() {
    try {
      // const res: any =
      await API.get(`api/my_products/product/${query.id}`);
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
                          {getAll("General_information")}
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
                          {getAll("Upgrades_price")}
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
                          {getAll("Description_and_instructions")}
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
                          {getAll("Gallery_and_folders")}
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
                          {getAll("Publish_service")}
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
                  <h4 className="title">{getAll("The_service_has")}</h4>
                  <p className="text">{getAll("Congratulations_Now_you")}</p>
                  <div className="add-butts">
                    <button
                      onClick={() => router.back()}
                      type="button"
                      className="btn flex-center butt-primary2-out mx-1 butt-md"
                    >
                      <span className="material-icons-outlined">
                        chevron_right
                      </span>
                      <span className="text"> {getAll("Previous_step")}</span>
                    </button>
                    <button
                      onClick={stepFive}
                      className="btn butt-md butt-primary2 mx-1"
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
