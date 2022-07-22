import { motion } from "framer-motion";
import React, { ReactElement, useContext } from "react";
import { CurrencyContext } from "../../contexts/currencyContext";
import useSWR from "swr";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/languageContext/context";

function CartPost({
  id,
  quantity,
  title,
  price,
  itemTotal,
  developments,
  deleteItem,
}): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const { data: userInfo }: any = useSWR("api/me");
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
  const [, getCurrency] = useContext(CurrencyContext);
  const specCurrency = getCurrency(
    userInfo?.user_details?.profile?.currency?.code
  )?.value;
  const symbol =
    userInfo?.user_details?.profile?.currency?.symbol_native || "$";
  return (
    <motion.li
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="cart-item"
    >
      <div className="row">
        <div className="col-md-10">
          <div className="cart-item-content me-auto" style={{ padding: 15 }}>
            <ul
              className="prices-list"
              style={{
                display: "flex",
                flexDirection: "row",
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              <li style={{ fontSize: 13, color: "#777" }}>
                <span>{getAll("Number_of_times")}</span>
                {quantity}
              </li>
              <li style={{ fontSize: 13, color: "#777" }}>
                <span>{getAll("Price_2")}</span>
                {specCurrency
                  ? Math.round(price * specCurrency) + symbol
                  : price + symbol}
              </li>
              <li style={{ fontSize: 13, color: "#777" }}>
                <strong>{getAll("Total")}</strong>
                {specCurrency
                  ? Math.round(itemTotal * specCurrency) + symbol
                  : price + symbol}
              </li>
            </ul>
            <h4
              className="title"
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#444",
                margin: 0,
                marginBottom: 13,
              }}
            >
              {title}
            </h4>
            <div className="panel-aside-body">
              <ul className="add-devloppers-nav">
                {developments.map((e: any) => {
                  return (
                    <li key={e.development_id} className="devloppers-item">
                      <div className="form-check me-auto">
                        <label
                          className="form-check-label"
                          htmlFor={"flexCheckDefault-id" + e.development_id}
                        >
                          {e.title}
                          <p className="price-duration">
                            {getAll("The_duration_will_cost")}
                            {DevdurationFunc(e.duration)}{" "}
                            {specCurrency
                              ? Math.round(e?.price * specCurrency) + symbol
                              : e?.price + symbol}
                          </p>
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-2 col-md-2">
          <div className="cart-item-price ml-auto">
            <ul
              className="price-nav"
              style={{
                display: "flex",
                listStyle: "none",
                justifyContent: "flex-end",
              }}
            >
              <li></li>
              <li>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="removequantity"
                  title={getAll("Delete_from_cart")}
                  style={{
                    display: "flex",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                  onClick={() => deleteItem(id)}
                >
                  <span className="material-icons material-icons-outlined">
                    remove
                  </span>
                </motion.button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
CartPost.propTypes = {
  title: PropTypes.string,
  id: PropTypes.any,
  quantity: PropTypes.number,
  author: PropTypes.string,
  itemTotal: PropTypes.number,
  price: PropTypes.number,
  deleteItem: PropTypes.func,
  updateItem: PropTypes.func,
  developments: PropTypes.array,
};

export default CartPost;
