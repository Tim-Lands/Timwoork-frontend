import Layout from "@/components/Layout/HomeLayout";
import PostsAside from "@/components/PostsAside";
import API from "../../config";
import React, { ReactElement, useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import useSWR, { mutate } from "swr";
import { CurrencyContext } from "../../contexts/currencyContext";

import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import CartPost from "@/components/Cart/CartPost";
import { message, Spin } from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import router from "next/router";

function index() {
  const { data: userInfo }: any = useSWR("api/me");
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const [, getCurrency] = useContext(CurrencyContext);
  const specCurrency = getCurrency(
    userInfo?.user_details?.profile?.currency?.code
  )?.value;
  const symbol =
    userInfo?.user_details?.profile?.currency?.symbol_native || "$";

  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: popularProducts, popularError }: any = useSWR(
    "api/filter?paginate=4&popular"
  );
  const [isLoading, setIsLoading]: any = useState(false);
  const { data: cartList }: any = useSWR("api/cart");

  const deleteItem = async (id: any) => {
    setIsLoading(true);
    try {
      const res = await API.post(`api/cart/cartitem/delete/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Authentication was successful.
      if (res.status === 200) {
        setIsLoading(false);
        //  message.success('لقد تم التحديث بنجاح')
        mutate("api/cart");
        mutate("api/me");
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };
  const updateItem = async (e: any, values: any) => {
    // e.preventDefault()
    setIsLoading(true);
    try {
      const res = await API.post(
        `api/cart/cartitem/update/${values.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Authentication was successful.
      if (res.status === 200) {
        setIsLoading(false);
        //  message.success('لقد تم التحديث بنجاح')
        mutate("api/cart");
        mutate("api/me");
      }
    } catch (error: any) {
      setIsLoading(false);
      //    message.error('حدث خطأ غير متوقع')
    }
  };
  const buyNowBtn = () => {
    if (
      (cartList && cartList.data == null) ||
      (cartList && cartList.data.price_with_tax == 0)
    ) {
      message.error(getAll("You_can’t_buy"));
    } else {
      router.push("/purchase");
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <MetaTags
        title={getAll("Purchases_cart")}
        metaDescription={getAll("Timwoork’s_cart")}
        ogDescription={getAll("Timwoork’s_cart")}
      />
      <div className="timwoork-single mt-4">
        <div
          className="row justify-content-md-center"
          style={{ maxWidth: 1300, marginInline: "auto" }}
        >
          <div className="col-lg-7">
            {!cartList && <Loading />}
            {cartList && cartList.data && cartList.data.cart_items.length == 0 && (
              <div className="cart-nothing my-5 py-5">
                <div className="cart-nothing-inner">
                  <div className="cart-nothing-img">
                    <img
                      src="/empty-cart.webp"
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="cart-nothing-content">
                    <h1 className="title">{getAll("Cart")}</h1>
                    <p className="text">{getAll("No_services_in")}</p>
                  </div>
                </div>
              </div>
            )}
            {cartList &&
              cartList.data &&
              cartList.data.cart_items.length !== 0 && (
                <Spin spinning={isLoading}>
                  <div className="timwoork-single-post bg-white mt-4">
                    <div className="timwoork-single-header">
                      <h1 className="title md">
                        <span className="material-icons material-icons-outlined">
                          shopping_cart
                        </span>{" "}
                        {getAll("Purchases_cart")}
                      </h1>
                    </div>
                    <div className="cart-list">
                      <ul
                        className="cart-list-item"
                        style={{ listStyle: "none", margin: 0, padding: 0 }}
                      >
                        {cartList.data.cart_items.map((e: any) => (
                          <CartPost
                            key={e.id}
                            id={e.id}
                            quantity={e.quantity}
                            title={e.product_title}
                            price={e.price_product_origine}
                            itemTotal={e.price_product}
                            deleteItem={deleteItem}
                            updateItem={updateItem}
                            developments={e.cart_item_developments}
                          />
                        ))}
                        <li className="cart-item">
                          <div className="d-flex">
                            <div
                              className="cart-item-header me-auto"
                              style={{ padding: 12 }}
                            >
                              <ul
                                className="prices-list"
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  listStyle: "none",
                                }}
                              >
                                <li style={{ fontSize: 13, color: "#777" }}>
                                  <strong>{getAll("Total_2")}</strong>
                                  {specCurrency
                                    ? Math.round(
                                        cartList?.data?.total_price *
                                          specCurrency
                                      )
                                    : cartList?.data?.total_price}
                                  {symbol}
                                </li>
                              </ul>
                            </div>
                            <div className="cart-item-price ml-auto">
                              <h4 className="price-title-total">
                                {specCurrency
                                  ? Math.round(
                                      cartList?.data?.total_price * specCurrency
                                    )
                                  : cartList?.data?.total_price}
                                {symbol}
                              </h4>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {cartList && cartList.data !== null && (
                      <div className="cart-list-continue">
                        <button
                          onClick={buyNowBtn}
                          className="btn butt-primary butt-lg ml-0"
                        >
                          {getAll("Buy_now")}
                        </button>
                      </div>
                    )}
                  </div>
                </Spin>
              )}
          </div>
        </div>
      </div>
      <div className="container">
        <PostsAside
          title={getAll("Most_popular_services")}
          PostData={popularProducts && popularProducts.data.data}
          isError={popularError}
          more={getAll("More")}
          linkURL="/products/popular"
        />
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
