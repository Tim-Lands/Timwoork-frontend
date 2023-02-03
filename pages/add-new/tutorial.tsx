import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect } from "react";
import { message } from "antd";
import router from "next/router";
import SidebarAdvices from "../../components/add-new/SidebarAdvices";
import { useAppSelector } from "@/store/hooks";
import Navbar from "components/productModify/navbar";

import PropTypes from "prop-types";
// import { MyProductsActions } from "store/myProducts/myProductsActions";
import { MetaTags } from "@/components/SEO/MetaTags";
import Unauthorized from "@/components/Unauthorized";
import NavigationButtons from "@/components/NavigationButtons";

function Complete({ query }) {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  // const getProduct = useAppSelector((state) => state.myProducts.product);

  //   useEffect(() => {
  //     if (getProduct.loaded && getProduct.id === query.id) return;
  //     dispatch(MyProductsActions.getProduct({ id: query.id }))
  //       .unwrap()
  //       .then(() => {})
  //       .catch(() => {
  //         router.push("/add-new");
  //       });
  //   }, []);

  // const stepsView = useRef(null);

  const veriedEmail = user.email_verified;

  if (!user.token && !veriedEmail) return <Unauthorized />;
  if (!query) return message.error(getAll("An_error_occurred"));

  useEffect(() => {
    // stepsView.current && stepsView.current.scrollIntoView();
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  //   async function stepFive() {
  //     try {
  //       await dispatch(
  //         MyProductsActions.modifySteps({
  //           url: `api/product/${query.id}/product-step-five`,
  //           id: query.id,
  //         })
  //       ).unwrap();
  //       message.success(getAll("The_update_has"));
  //       router.push({
  //         pathname: "/myproducts",
  //         query: {
  //           id: query.id, // pass the id
  //         },
  //       });
  //     } catch (error: any) {
  //       message.error(getAll("An_unexpected_error_occurred"));
  //     }
  //   }
  return (
    <>
      <MetaTags
        title={getAll("Tutorial")}
        metaDescription={getAll("Tutorial")}
        ogDescription={getAll("Tutorial")}
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
              <Navbar active="tutorial" navigate={false} url="" />

              <div className="col-md-12">
                <div className="py-4 d-flex">
                  <span className="me-auto"></span>
                  <NavigationButtons
                    isBackVisible={false}
                    onNextClick={() => {}}
                    nextTitle={getAll("Next_step")}
                  />
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
