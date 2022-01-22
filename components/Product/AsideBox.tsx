import PropTypes from "prop-types";
import Cookies from 'js-cookie'
import { Spin, Dropdown } from 'antd'
export default function AsideBox({ 
    count_buying, 
    menuShare, 
    _totalPrice, 
    addToCart, 
    isLoadingCart, 
    durationFunc, 
    quantutyCount,
    setQuantutyCount,
    developments,
    handleOnChangeAddID,
    DevdurationFunc
}) {
    const token = Cookies.get('token')

    return (
        <div className="single-sidebar">
        <Spin spinning={isLoadingCart}>
          <div className="single-panel-aside">
            <div className="panel-aside-header">
              <ul className="nav top-aside-nav">
                <li className="delevr-time me-auto">
                  <span
                    className="material-icons material-icons-outlined">timer</span> مدة التسليم: {durationFunc()}
                </li>
                <li className="cat-post ml-auto">
                  <Dropdown overlay={menuShare}>
                    <a>
                      <span className="material-icons material-icons-outlined">share</span> مشاركة الخدمة
                    </a>
                  </Dropdown>
                </li>
              </ul>
            </div>
            {token &&
              <div className="row mx-auto py-2">
                <div className="col-7">
                  <p className="text-quatity">عدد مرات الشراء: </p>
                </div>
                <div className="col-5">
                  <input
                    type="number"
                    value={quantutyCount}
                    name="quantity_count"
                    className="timlands-inputs sm"
                    onChange={(e: any) => setQuantutyCount(e.target.value)}
                  />
                </div>
              </div>
            }
            {developments &&
              <div className="panel-aside-body">
                <div className="add-devloppers-header">
                  <h3 className="title">التطويرات المتوفرة</h3>
                </div>
                <ul className="add-devloppers-nav">
                  {developments.map((e: any) => {
                    return (
                      <li key={e.id} className="devloppers-item">
                        <div className="form-check">
                          {token && <input
                            className="form-check-input"
                            type="checkbox"
                            id={"flexCheckDefault-id" + e.id}
                            value={e.id}
                            onChange={handleOnChangeAddID} {..._totalPrice()}
                          />}
                          <label className="form-check-label" htmlFor={"flexCheckDefault-id" + e.id}>
                            {e.title}
                            <p className="price-duration">ستكون المدة {DevdurationFunc(e.duration)} بمبلغ {e.price}$</p>
                          </label>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            }
            <div className="panel-aside-footer">
              <div className="aside-footer-total-price">
                <h1 className="price-total me-auto">
                  <strong>المجموع </strong> {_totalPrice()}$
                </h1>
                <div className="bayers-count">
                  <p className="num">
                    <span className="count">{count_buying} </span>
                    <span className="text"> اشتروا هذا</span>
                  </p>
                </div>
              </div>
              <div className="aside-footer-note">
                <p className="text">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا</p>
              </div>
              {token &&
                <div className="aside-footer-addtocart">
                  {/*<button disabled={true} className="btn butt-white butt-lg">
                    <span className="material-icons material-icons-outlined">remove_shopping_cart</span>
                    تمت الإضافة
                  </button>*/}

                  <button
                    onClick={addToCart}
                    className="btn butt-primary butt-lg">
                    <span className="material-icons material-icons-outlined">add_shopping_cart</span>
                    إضافة إلى السلة
                  </button>
                </div>
              }
            </div>
          </div>
        </Spin>
      </div>
    )
}
AsideBox.propTypes = {
    count_buying: PropTypes.any,
    menuShare: PropTypes.any,
    _totalPrice: PropTypes.func,
    quantutyCount: PropTypes.any,
    setQuantutyCount: PropTypes.any,
    developments: PropTypes.any,
    addToCart: PropTypes.func,
    isLoadingCart: PropTypes.bool,
    DevdurationFunc: PropTypes.func,
    durationFunc: PropTypes.func,
    handleOnChangeAddID: PropTypes.func,
};