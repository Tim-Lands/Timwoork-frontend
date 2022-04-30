import Layout from '../../components/Layout/HomeLayout'
import { ReactElement } from "react";
import PropTypes from "prop-types";


function BankAccountCart({ setIsShowBankTransfert, userInfo={} }:any) {
    console.log(userInfo)
    return (
        <div className={"timlands-panel-cart"}>
            <div className="py-4">
                <div className="timlands-panel-cart-header">
                    <h3 className="title">الحوالة المالية</h3>
                </div>
                <div className="timlands-panel-cart-body">
                    <div className="row">
                        <div className="col-6">
                            <div className="cart-item">
                                <h4 className="cart-title">الاسم الكامل</h4>
                                <h4 className="cart-text">{(userInfo&&userInfo.full_name)||''}</h4>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="cart-item">
                                <h4 className="cart-title">المدينة</h4>
                                <h4 className="cart-text">{(userInfo&&userInfo.city)||''}</h4>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="cart-item">
                                <h4 className="cart-title">عنوان الحوالة</h4>
                                <h4 className="cart-text">{userInfo?`${userInfo.address_line_one||""}  ${userInfo.adress_line_two||''}`:''}</h4>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="cart-item">
                                <h4 className="cart-title">رقم الهاتف</h4>
                                <h4 className="cart-text">{(userInfo&&userInfo.phone_number_without_code)||''}</h4>
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
BankAccountCart.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default BankAccountCart
BankAccountCart.propTypes = {
    token: PropTypes.any,
    setIsShowBankTransfert: PropTypes.func,
    userInfo: PropTypes.object,
};