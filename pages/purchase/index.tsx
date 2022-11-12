import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { motion } from "framer-motion";
import router from "next/router";
import API from "../../config";
import Loading from "@/components/Loading";
import { Badge, Result, Tooltip } from "antd";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Alert } from "@/components/Alert/Alert";
import { useAppSelector } from "@/store/hooks";

const stripePromise = loadStripe(
  "pk_live_51KVxMmKZiLP53MTnv5FYIaUkHebKN8foIJRwcHoOwfsMJq8wgNFZZcqx7UIXfpfsgS25WpCSO4orGz5m0TFLa0pC00CrKR1Vp8"
);

function Bill() {
  const { getAll } = useAppSelector((state) => state.languages);
  const profile = useAppSelector((state) => state.profile);
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);
  const { value, symbol_native } = useAppSelector((state) => state.currency.my);

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [validationsGeneral, setValidationsGeneral]: any = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (elements == null) {
        return;
      }
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setIsLoading(true);
      try {
        await API.post(`api/purchase/stripe/charge`, {
          payment_method_id: paymentMethod.id,
        });
        router.push("/mypurchases");
      } catch (error) {
        setIsLoading(false);

        if (error.response && error.response.data) {
          setValidationsGeneral(error.response.data);
        }
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit}>
          {validationsGeneral.msg && (
            <Alert type="error">{validationsGeneral.msg}</Alert>
          )}
          <CardElement />
          <button
            type="submit"
            onClick={() => setIsLoading(true)}
            className="btn butt-md purchace-by-stripe-btn butt-primary mt-2"
            disabled={!stripe || !elements}
          >
            <span>{getAll("Buy_now")}</span>
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm mx-1"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button>
        </form>
      </>
    );
  };
  const [billPayment, setBillPayment] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  const [getLink, setGetLink] = useState("");
  const [paymentsGates, setPaymentsGates]: any = useState({
    Stripe: false,
    Wallet: false,
    Paypal: false,
  });

  const veriedEmail = user.email_verified;

  const mybalance = profile.withdrawable_amount;

  async function getPaypal() {
    setIsLoading(true);
    try {
      const res: any = await API.post(
        `api/purchase/paypal/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setGetLink(res.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
    getPaypal();
  }, [user]);
  useEffect(() => {
    if (cart.data.length === 0 && !cart.isLoading) {
      router.push("/mypurchases");

      return;
    }
  }, [cart]);
  useEffect(() => {
    const new_gates = {};
    cart?.cart_payments?.forEach((gate) => (new_gates[gate.name] = true));
    setPaymentsGates(new_gates);
  }, [cart?.cart_payments]);
  async function chargeWallet() {
    setIsWalletLoading(true);
    try {
      const res = await API.post(
        `api/purchase/wallet/charge`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        router.push("/mypurchases");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setValidationsGeneral(error.response.data);
      }
    }
  }
  const onBillPaymentChange = (e) => setBillPayment(e.target.value);

  return (
    <>
      <MetaTags
        title={getAll("Purchase_operation")}
        metaDescription={getAll("Purchase_operation")}
        ogDescription={getAll("Purchase_operation")}
      />
      {veriedEmail && (
        <div style={{ maxWidth: 1350, marginInline: "auto" }}>
          {!cart.id && !cart.isLoading && (
            <div className="row py-4 justify-content-center">
              <div className="col-md-5">
                <Result
                  status="warning"
                  title={getAll("An_unexpected_error")}
                  subTitle={getAll("An_error_occurred_3")}
                />
              </div>
            </div>
          )}
          <div className="row py-4 justify-content-center">
            <div className="col-md-3">
              <div className="app-bill">
                <div className="app-bill-header">
                  <h3 className="title">{getAll("Finale_bill")}</h3>
                </div>
                {cart.isLoading && <Loading />}
                {cart.cart_payments.map((e, i) => (
                  <div
                    key={i}
                    className="app-bill-content"
                    style={{ marginBottom: 9 }}
                  >
                    {e.pivot.type_payment_id == billPayment && (
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          {getAll("Services_number")}
                          <span className="">{cart.itemsLength}</span>
                        </li>
                        <li
                          style={{ fontSize: 12, fontWeight: 300 }}
                          className="list-group-item total d-flex justify-content-between align-items-center"
                        >
                          {getAll("Transfer_fees_for")}
                          {e.name}{" "}
                          <span className="me-auto">
                            <Tooltip title={getAll("These_fees_cover")}>
                              <Badge
                                style={{ color: "#52c41a " }}
                                count={
                                  <span
                                    style={{ color: "#52c41a", fontSize: 16 }}
                                    className="material-icons"
                                  >
                                    info
                                  </span>
                                }
                              />
                            </Tooltip>
                          </span>
                          <span className="">
                            {Math.round(e.pivot.tax * value) + symbol_native}
                          </span>
                        </li>
                        <li
                          style={{ fontSize: 12, fontWeight: 300 }}
                          className="list-group-item total d-flex justify-content-between align-items-center"
                        >
                          {getAll("Total_without_fees")}
                          <span className="">
                            {Math.round(e.pivot.total * value) + symbol_native}
                          </span>
                        </li>
                        <li
                          style={{ fontSize: 12, fontWeight: 300 }}
                          className="list-group-item total d-flex justify-content-between align-items-center"
                        >
                          {getAll("Total_with_fees")}
                          <span className="">
                            {Math.round(e.pivot.total_with_tax * value) +
                              symbol_native}
                          </span>
                        </li>
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-5">
              <div className="app-bill">
                <div className="app-bill-header">
                  <h3 className="title">{getAll("Choose_payment_method")}</h3>
                </div>
                {cart.id && (
                  <div className="app-bill-payment">
                    <div className="form-check" style={{ marginBlock: 9 }}>
                      <input
                        className="form-check-input"
                        type="radio"
                        value="2"
                        name="billPayment"
                        id="billPayment-strap"
                        disabled={!paymentsGates["Stripe"]}
                        checked={billPayment == 2}
                        onChange={onBillPaymentChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billPayment-strap"
                      >
                        {getAll("Payment_by_bank")}
                      </label>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      {billPayment == 2 ? (
                        <motion.div
                          dir="ltr"
                          initial={{ y: -49, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          <Elements stripe={stripePromise}>
                            <CheckoutForm />
                          </Elements>
                        </motion.div>
                      ) : null}
                    </div>
                    <div className="form-check" style={{ marginBlock: 9 }}>
                      <input
                        className="form-check-input"
                        type="radio"
                        disabled={!paymentsGates["Paypal"]}
                        value="1"
                        name="billPayment"
                        id="billPayment-paypal"
                        checked={billPayment == 1}
                        onChange={onBillPaymentChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billPayment-paypal"
                      >
                        {getAll("Payment_via_PayPal")}
                      </label>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      {billPayment == 1 ? (
                        <motion.div
                          initial={{ y: -49, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          <a
                            href={getLink}
                            className="btn butt-primary2 butt-lg purchace-by-paypal-btn"
                          >
                            {isLoading && (
                              <span
                                className="spinner-border spinner-border-md"
                                role="status"
                              ></span>
                            )}
                            {!isLoading && (
                              <>
                                {" "}
                                <i className="fab fa-paypal"></i> |{" "}
                                {getAll("Payment_via_PayPal")}
                              </>
                            )}
                          </a>
                        </motion.div>
                      ) : null}
                    </div>
                    {Number(mybalance) < Number(cart.priceWithTax) ? (
                      <>
                        <Alert type="primary">{getAll("You_cannot_buy")}</Alert>
                      </>
                    ) : (
                      <>
                        <div className="form-check" style={{ marginBlock: 9 }}>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="3"
                            name="billPayment"
                            id="billPayment-wallet"
                            checked={billPayment == 3}
                            disabled={!paymentsGates["Wallet"]}
                            onChange={onBillPaymentChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="billPayment-wallet"
                          >
                            {getAll("Payment_via_wallet")}
                          </label>
                        </div>
                        <div style={{ overflow: "hidden" }}>
                          {billPayment == 3 ? (
                            <motion.div
                              initial={{ y: -49, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                            >
                              {validationsGeneral.msg && (
                                <Alert type="error">
                                  {validationsGeneral.msg}
                                </Alert>
                              )}
                              <div className="purchase-by-wallet">
                                <p className="purchase-text">
                                  {getAll("Or_you_can")}
                                </p>
                                <button
                                  onClick={chargeWallet}
                                  disabled={isWalletLoading}
                                  className="btn butt-lg butt-green flex-center-just"
                                >
                                  {isWalletLoading && (
                                    <span
                                      className="spinner-border spinner-border-md"
                                      role="status"
                                    ></span>
                                  )}
                                  {!isWalletLoading && (
                                    <>
                                      <img
                                        src={"/logo2.png"}
                                        width={15}
                                        height={17}
                                      />{" "}
                                      {getAll("Buy_now")} (
                                      <span className="">
                                        {Math.round(cart.itemsTotal * value) +
                                          symbol_native}
                                      </span>
                                      )
                                    </>
                                  )}
                                </button>
                              </div>
                            </motion.div>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Bill.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Bill;
