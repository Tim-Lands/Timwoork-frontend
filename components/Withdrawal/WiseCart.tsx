import Layout from "../../components/Layout/HomeLayout";
import { ReactElement } from "react";
import PropTypes from "prop-types";

function WiseCart({ setIsShowBankTransfert, userInfo = {} }: any) {
  return (
    <div className={"timlands-panel-cart"}> 
      <div className="py-4">
        <div className="timlands-panel-cart-header">
          <h3 className="title">تحويل الوايز Wise</h3>
        </div>
        <div className="timlands-panel-cart-body">
          <div className="row">
            <div className="col-12">
              <div className="cart-item">
                <h4 className="cart-title">عنوان البريد</h4>
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
            <span className="text">تعديل المعلومات</span>
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
