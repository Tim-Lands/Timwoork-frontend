import Layout from "../../components/Layout/HomeLayout";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { useAppSelector } from "@/store/hooks";

function WiseCart({ setIsShowBankTransfert, userInfo = {} }: any) {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className={"timlands-panel-cart"}>
      <div className="py-4">
        <div className="timlands-panel-cart-header">
          <h3 className="title">{getAll("Wise_transfer")}</h3>
        </div>
        <div className="timlands-panel-cart-body">
          <div className="row">
            <div className="col-12">
              <div className="cart-item">
                <h4 className="cart-title">
                  {getAll("E_mail")}
                  {getAll("Address")}
                </h4>
                <h4 className="cart-text">
                  {(userInfo && userInfo.email) || ""}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="timlands-panel-cart-footer">
          <button
            type="button"
            onClick={() => setIsShowBankTransfert(true)}
            className="btn flex-center butt-green ml-auto butt-sm"
          >
            <span className="text">{getAll("Edit_information")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
WiseCart.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default WiseCart;
WiseCart.propTypes = {
  setIsShowBankTransfert: PropTypes.func,
  userInfo: PropTypes.object,
};
