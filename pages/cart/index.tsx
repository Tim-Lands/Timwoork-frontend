import Layout from "@/components/Layout/HomeLayout";
import PostsAside from "@/components/PostsAside";
import API from "../../config";
import React, { ReactElement, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import CartPost from "@/components/Cart/CartPost";
import { message, Spin } from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import router from "next/router";

function index() {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: popularProducts, popularError }: any = useSWR(
    "api/filter?paginate=4&popular"
  );
  const [isLoading, setIsLoading]: any = useState(false);
  const { data: cartList }: any = useSWR("api/cart");
  //const { data: userInfo }: any = useSWR('api/me')

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
      console.log(error);
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
      message.error("لا يمكنك الشراء الآن لأن السلة فارغة");
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
        title={"سلة المشتريات"}
        metaDescription={"سلة المشتريات - تيموورك"}
        ogDescription={"سلة المشتريات - تيموورك"}
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
                    <img src="/empty-cart.webp" alt="" />
                  </div>
                  <div className="cart-nothing-content">
                    <h1 className="title">السلة فارغة</h1>
                    <p className="text">
                      لاتوجد خدمات في سلة المشتريات يمكنك الذهاب إلى تصفح
                      الخدمات
                    </p>
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
                        سلة المشتريات
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
                                  <strong>المجموع: </strong>
                                  {cartList &&
                                    cartList.data !== null &&
                                    cartList.data.total_price}
                                  $
                                </li>
                              </ul>
                            </div>
                            <div className="cart-item-price ml-auto">
                              <h4 className="price-title-total">
                                $
                                {cartList &&
                                  cartList.data !== null &&
                                  cartList.data.total_price}
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
                          اشتري الآن
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
          title="الخدمات الأكثر شعبية "
          PostData={popularProducts && popularProducts.data.data}
          isError={popularError}
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
