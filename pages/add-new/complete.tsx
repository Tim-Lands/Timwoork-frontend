import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useRef } from "react";
import { message } from "antd";
import router from "next/router";
import SidebarAdvices from "../../components/add-new/SidebarAdvices";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Navbar from "components/productModify/navbar";

import PropTypes from "prop-types";
import { MyProductsActions } from "store/myProducts/myProductsActions";
import { MetaTags } from "@/components/SEO/MetaTags";
import Unauthorized from "@/components/Unauthorized";
import NavigationButtons from "@/components/NavigationButtons";

function Complete({ query }) {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const getProduct = useAppSelector((state) => state.myProducts.product);

  useEffect(() => {
    if (getProduct.loaded && getProduct.id === query.id) return;
    dispatch(MyProductsActions.getProduct({ id: query.id }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        router.push("/add-new");
      });
  }, []);

  const stepsView = useRef(null);

  const veriedEmail = user.email_verified;

  if (!user.token && !veriedEmail) return <Unauthorized />;
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
          id: query.id,
        })
      ).unwrap();
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
              <Navbar active="publish" navigate={false} url="" />

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
                  <NavigationButtons onNextClick={()=>stepFive()} nextTitle={getAll('Publish_service')} backTitle={getAll('Previous_step')}/>
                    
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
