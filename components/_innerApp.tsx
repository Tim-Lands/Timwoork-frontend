import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import router from "next/router";
import Cookies from "js-cookie";
import API from "../config";
import PropTypes from "prop-types";
import { UserActions } from "../store/user/UserActions";
import { ProfileActions } from "../store/profile/profileActions";
import { CategoriesActions } from "../store/categories/categoriesActions";
import { CartActions } from "../store/cart/cartActions";
import { CurrencyActions } from "@/store/currency/currencyActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getSpecCurrency from "../utils/currency";

const App = ({ innerApp }) => {
  const unused = "";
  const user = useAppSelector((state) => state.user);
  const language = useAppSelector((state) => state.languages.language);

  const currencies = useAppSelector((state) => state.currency.values);
  const currency = useAppSelector((state) => state.currency.my);
  const dispatch = useAppDispatch();
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  useEffect(() => {
    if (user.token) initialize();
    else {
      dispatch(UserActions.loaded());
    }
  }, [user.token]);
  async function initialize() {
    await dispatch(UserActions.setToken(user.token));
    dispatch(UserActions.getData({}));
    dispatch(ProfileActions.getProfileData());
    dispatch(CurrencyActions.getData());
    dispatch(CurrencyActions.getAllCurrenciesValues());
    dispatch(CartActions.getCartData());
    dispatch(CategoriesActions.getProductCategories());
  }
  useEffect(() => {
    if (currencies.loaded && currency.code) {
      dispatch(
        CurrencyActions.setValue(
          getSpecCurrency(currency.code, currencies.data).value
        )
      );
    }
  }, [currencies, currency.code]);
  useEffect(() => {
    dispatch(CategoriesActions.getAllCategories());
    dispatch(CategoriesActions.getTopCategories());
    dispatch(CategoriesActions.getTopMainCategories());
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          return url.includes("wp-json")
            ? await API.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((r: any) => r.data)
                .catch(() => {
                  if (url == "api/me" && token) {
                    router.reload();
                  }
                })
            : await API.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "X-LOCALIZATION": language,
                },
              })
                .then((r: any) => r.data)
                .catch(() => {
                  if (url == "api/me" && token) {
                    router.reload();
                  }
                });
        },
      }}
    >
      {language && (
        <ConfigProvider direction={`${language === "ar" ? "rtl" : "ltr"}`}>
          <div className={`${language === "ar" ? "rtl" : "ltr"}`}>
            {innerApp}
          </div>
        </ConfigProvider>
      )}
    </SWRConfig>
  );
};
App.propTypes = {
  innerApp: PropTypes.node,
};
export default App;
