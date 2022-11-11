import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useRef } from "react";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Navbar from "components/productModify/navbar";
import router from "next/router";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import Unauthorized from "@/components/Unauthorized";
import { MyProductsActions } from "store/myProducts/myProductsActions";

function Complete({ query }) {
  const dispatch = useAppDispatch();
  const id = query.id;
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);
  const getProduct = useAppSelector((state) => state.myProducts.product);
  useEffect(() => {
    if (!id) return;
    if (getProduct.loaded && getProduct.id == id) return;
    dispatch(MyProductsActions.getProduct({ id: id }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        router.push("/myproducts");
      });
  }, [id]);
  const stepsView = useRef(null);
  const veriedEmail = user.email_verified;

  if (!user.isLogged && !veriedEmail) return <Unauthorized />;
  if (!query) return message.error(getAll("An_error_occurred"));

  useEffect(() => {
    stepsView.current && stepsView.current.scrollIntoView();
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  async function stepFive() {
    try {
      await dispatch(
        MyProductsActions.modifySteps({
          url: `api/product/${query.id}/product-step-five`,
          id,
        })
      ).unwrap();
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
              <Navbar
                active="publish"
                navigate={true}
                url="edit-product"
                id={id}
              />
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
