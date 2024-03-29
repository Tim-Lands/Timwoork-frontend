import Layout from "../../components/Layout/HomeLayout";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { useAppSelector } from "@/store/hooks";

function MoneyAccountCart({ setIsShowBankTransfert, userInfo = {} }: any) {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className={"timlands-panel-cart"}>
      <div className="py-4">
        <div className="timlands-panel-cart-header">
          <h3 className="title">{getAll("Bank_transfer")}</h3>
        </div>
        <div className="timlands-panel-cart-body">
          <div className="row">
            <div className="col-6">
              <div className="cart-item">
                <h4 className="cart-title">{getAll("Full_name")}</h4>
                <h4 className="cart-text">
                  {(userInfo && userInfo.full_name) || ""}
                </h4>
              </div>
            </div>
            <div className="col-6">
              <div className="cart-item">
                <h4 className="cart-title">{getAll("IBAN")}</h4>
                <h4 className="cart-text">
                  {(userInfo && userInfo.bank_iban) || ""}
                </h4>
              </div>
            </div>
            <div className="col-6">
              <div className="cart-item">
                <h4 className="cart-title">{getAll("Bank_address")}</h4>
                <h4 className="cart-text">
                  {userInfo
                    ? `${userInfo.bank_adress_line_one || ""} ${
                        userInfo.bank_adress_line_two || ""
                      }`
                    : ""}
                </h4>
              </div>
            </div>
            <div className="col-6">
              <div className="cart-item">
                <h4 className="cart-title">{getAll("Bank_name")}</h4>
                <h4 className="cart-text">
                  {(userInfo && userInfo.bank_name) || ""}
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
MoneyAccountCart.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default MoneyAccountCart;
MoneyAccountCart.propTypes = {
  token: PropTypes.any,
  setIsShowBankTransfert: PropTypes.func,
  userInfo: PropTypes.object,
};
