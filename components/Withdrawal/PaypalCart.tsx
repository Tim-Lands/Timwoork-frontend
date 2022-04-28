import Layout from '../../components/Layout/HomeLayout'
import { ReactElement } from "react";
import PropTypes from "prop-types";

function PaypalCart({ setIsShowBankTransfert }) {

    return (
        <div className={"timlands-panel-cart"}>
            <div className="py-4">
                <div className="timlands-panel-cart-header">
                    <h3 className="title">تحويل بايبال Paypal</h3>
                </div>
                <div className="timlands-panel-cart-body">
                    <div className="row">
                        <div className="col-7">
                            <div className="cart-item">
                                <h4 className="cart-title">عنوان البنك</h4>
                                <h4 className="cart-text">LB45878885736375</h4>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="cart-item">
                                <h4 className="cart-title">اسم البنك</h4>
                                <h4 className="cart-text">LB45878885736375</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timlands-panel-cart-footer">
                    <button type="button" onClick={() => setIsShowBankTransfert(true)} className="btn flex-center butt-green ml-auto butt-sm">
                        <span className="text">تعديل المعلومات</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
PaypalCart.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default PaypalCart
PaypalCart.propTypes = {
    token: PropTypes.any,
};