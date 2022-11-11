import Layout from "@/components/Layout/HomeLayout";
import PostsAside from "@/components/PostsAside";
import React, { ReactElement, useEffect } from "react";
import Loading from "@/components/Loading";
import CartPost from "@/components/Cart/CartPost";
import { message, Spin, notification } from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import { CartActions } from "../../store/cart/cartActions";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import router from "next/router";

function index() {
  const dispatch = useAppDispatch();
  const { getAll } = useAppSelector((state) => state.languages);

  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user);
  const { loaded, priceWithTax, itemsLength, isLoading, data, itemsTotal } =
    cart;

  const { value, symbol_native } = useAppSelector((state) => state.currency.my);
  const { popular } = useAppSelector((state) => state.products);

  const buyNowBtn = () => {
    if (itemsLength === 0 || priceWithTax === 0) {
      message.error(getAll("You_can’t_buy"));
    } else {
      router.push("/purchase");
    }
  };
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  console.log(itemsTotal, value, symbol_native);
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
            {!loaded && isLoading && <Loading />}
            {!isLoading && loaded && itemsLength === 0 && (
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
            {itemsLength > 0 && (
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
                      {data.map((e: any) => (
                        <CartPost
                          key={e.id}
                          id={e.id}
                          quantity={e.quantity}
                          title={e.product_title}
                          price={e.price_product_origine}
                          itemTotal={e.price_product}
                          deleteItem={async (id: number) => {
                            try {
                              await dispatch(
                                CartActions.deleteProduct({ id })
                              ).unwrap();
                            } catch (error) {
                              notification.error({
                                message: getAll("Alert"),
                                description:
                                  error.msg || getAll("An_unexpected_error"),
                                placement: "topLeft",
                              });
                            }
                          }}
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
                                {Math.round(itemsTotal * value)}
                                {symbol_native}
                              </li>
                            </ul>
                          </div>
                          <div className="cart-item-price ml-auto">
                            <h4 className="price-title-total">
                              {Math.round(itemsTotal * value)}
                              {symbol_native}
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {itemsLength !== 0 && (
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
      <PostsAside
        title={getAll("Most_popular_services")}
        PostData={popular.data}
        more={getAll("More")}
        linkURL="/products/popular"
      />
    </>
  );
}

index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
