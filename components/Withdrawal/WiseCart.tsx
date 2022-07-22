import Layout from "../../components/Layout/HomeLayout";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function WiseCart({ setIsShowBankTransfert, userInfo = {} }: any) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLogin = getSectionLanguage("login");
  return (
    <div className={"timlands-panel-cart"}>
      <div className="py-4">
        <div className="timlands-panel-cart-header">
          <h3 className="title">{getLogin("Wise_transfer")}</h3>
        </div>
        <div className="timlands-panel-cart-body">
          <div className="row">
            <div className="col-12">
              <div className="cart-item">
                <h4 className="cart-title">
                  {getLogin("E_mail")}
                  {getLogin("Address")}
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
            <span className="text">{getLogin("Edit_information")}</span>
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
  token: PropTypes.any,
  setIsShowBankTransfert: PropTypes.func,
  userInfo: PropTypes.object,
};
