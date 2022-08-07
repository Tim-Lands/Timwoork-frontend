import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Spin, Dropdown, notification, message } from "antd";
import { Menu } from "antd";
import { useState } from "react";
import router from "next/router";
import { mutate } from "swr";
import API from "../../config";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";

export default function AsideBox({
  title,
  count_buying,
  product_id,
  price,
  duration,
  developments,
}) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [theIDs, settheIDs] = useState([]);
  const [checkedDevelopments, setcheckedDevelopments] = useState([]);
  const [quantutyCount, setQuantutyCount] = useState(1);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  function durationFunc() {
    if (duration == 1) {
      return getAll("One_day");
    }
    if (duration == 2) {
      return getAll("2_days");
    }
    if (duration > 2 && duration < 11) {
      return duration + getAll("Days");
    }
    if (duration >= 11) {
      return duration + getAll("Day");
    }
  }
  function DevdurationFunc(duration) {
    if (duration == 1) {
      return getAll("One_day");
    }
    if (duration == 2) {
      return getAll("2_days");
    }
    if (duration > 2 && duration < 11) {
      return duration + getAll("Days");
    }
    if (duration >= 11) {
      return duration + getAll("Day");
    }
  }
  const addToCart = async () => {
    setIsLoadingCart(true);
    try {
      const res = await API.post(
        "api/cart/store",
        {
          quantity: Number(quantutyCount),
          product_id: product_id,
          developments: theIDs,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Authentication was successful.
      if (res.status === 200) {
        mutate("api/me");
        const key = `open${Date.now()}`;
        const btn = (
          <button
            onClick={() => router.push("/cart")}
            className="btn butt-sm butt-primary"
          >
            {getAll("Go_to_cart")}
          </button>
        );

        notification.open({
          message: getAll("Explanatory_message"),
          description: getAll("This_service_was"),
          btn,
          key,
          onClose: close,
        });
        setIsLoadingCart(false);
      }
    } catch (error: any) {
      setIsLoadingCart(false);
      if (error.response && error.response.status === 400) {
        notification.open({
          message: getAll("Error_message"),
          description: getAll("Your_service_cannot"),
          onClose: close,
        });
      } else {
        message.error(getAll("An_unexpected_error"));
      }
    }
  };
  /***** get the total price when any of  developments checkboxes or quantutyCount changed *****/
  function _totalPrice() {
    let __checkedDevelopments_sum = 0;
    const b = [],
      c = checkedDevelopments,
      a = developments && developments.map((e) => e.id);

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < c.length; j++) {
        if (a[i] == c[j]) {
          b.push(i);
        }
      }
    }
    for (let i = 0; i < b.length; i++) {
      __checkedDevelopments_sum =
        __checkedDevelopments_sum + parseInt(developments[b[i]].price);
    }

    const total_price =
      (parseInt(price) + __checkedDevelopments_sum) * quantutyCount;

    return Math.abs(total_price);
  }
  const handleOnChangeAddID = (event) => {
    let newArray = [...theIDs, event.target.value];
    if (theIDs.includes(event.target.value)) {
      newArray = newArray.filter((day) => day !== event.target.value);
    }
    settheIDs(newArray);
    setcheckedDevelopments(newArray);
  };
  const menuShare = (
    <Menu>
      <Menu.Item key="1" icon={<i className="fa fa-facebook"></i>}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=https://timwoork.com/p/${title}`}
        >
          {getAll("Share_on_Facebook")}
        </a>
      </Menu.Item>
      <Menu.Item key="2" icon={<i className="fa fa-facebook"></i>}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/intent/tweet?url=https://timwoork.com/p/${title}&text=`}
        >
          {getAll("Share_on_Twitter")}
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="single-sidebar">
      <Spin spinning={isLoadingCart}>
        <div className="single-panel-aside">
          <div className="panel-aside-header">
            <ul className="nav top-aside-nav">
              <li className="delevr-time me-auto">
                <span className="material-icons material-icons-outlined">
                  timer
                </span>{" "}
                {getAll("Delivery_duration")}
                {durationFunc()}
              </li>
              <li className="cat-post ml-auto">
                <Dropdown overlay={menuShare}>
                  <a>
                    <span className="material-icons material-icons-outlined">
                      share
                    </span>{" "}
                    {getAll("Share_service")}
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
          {token && (
            <div className="row mx-auto py-2">
              <div className="col-7">
                <p className="text-quatity">{getAll("Number_of_purchases")}</p>
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
          )}
          <div className="panel-aside-body">
            <div className="add-devloppers-header">
              <h3 className="title">{getAll("Available_developments")}</h3>
            </div>
            <ul className="add-devloppers-nav">
              {developments &&
                developments.map((e: any) => {
                  return (
                    <li key={e.id} className="devloppers-item">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={"flexCheckDefault-id" + e.id}
                          value={e.id}
                          onChange={handleOnChangeAddID}
                          {..._totalPrice()}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={"flexCheckDefault-id" + e.id}
                        >
                          {e.title}
                          <p className="price-duration">
                            {getAll("The_duration_will_cost")}
                            {DevdurationFunc(e.duration)} {e.price}$
                          </p>
                        </label>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="panel-aside-footer">
            <div className="aside-footer-total-price">
              <h1 className="price-total me-auto">
                <strong>{getAll("Total")} </strong> {_totalPrice()}$
              </h1>
              <div className="bayers-count">
                <p className="num">
                  <span className="count">{count_buying} </span>
                  <span className="text"> {getAll("Have_bought_this")}</span>
                </p>
              </div>
            </div>
            {token && (
              <div className="aside-footer-addtocart">
                {/*<button disabled={true} className="btn butt-white butt-lg">
                    <span className="material-icons material-icons-outlined">remove_shopping_cart</span>
                    تمت الإضافة
                  </button>*/}

                <button
                  onClick={addToCart}
                  className="btn butt-primary butt-lg"
                >
                  <span className="material-icons material-icons-outlined">
                    add_shopping_cart
                  </span>
                  {getAll("Add_to_cart")}
                </button>
              </div>
            )}
          </div>
        </div>
      </Spin>
    </div>
  );
}
AsideBox.propTypes = {
  count_buying: PropTypes.any,
  title: PropTypes.string,
  developments: PropTypes.any,
  product_id: PropTypes.func,
  price: PropTypes.any,
  duration: PropTypes.any,
};
