import React, { ReactElement, useEffect, useState, useContext } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { CurrencyContext } from "../../contexts/currencyContext";
import Cookies from "js-cookie";
import router from "next/router";
import PropTypes from "prop-types";
import { Alert } from "@/components/Alert/Alert";
import API from "../../config";
import Loading from "@/components/Loading";
import useSWR from "swr";
import { useAppSelector } from "@/store/hooks";

function Paypal({ query }) {
  const { getAll } = useAppSelector((state) => state.languages);

  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [getBills, setGetBills]: any = useState({});

  const { data: userInfo }: any = useSWR("api/me");
  const [, getCurrency] = useContext(CurrencyContext);
  const specCurrency = getCurrency(
    userInfo?.user_details?.profile?.currency?.code
  )?.value;
  const symbol =
    userInfo?.user_details?.profile?.currency?.symbol_native || "$";
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  async function getBill() {
    setIsLoading(true);
    try {
      const res: any = await API.post(
        `api/purchase/paypal/charge`,
        { token: query.token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setIsError(false);
        setGetBills(res.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }
  useEffect(() => {
    if (query.return == 1) {
      getBill();
    }
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);
  return (
    <div className="row py-4 justify-content-center">
      {veriedEmail && (
        <div className="col-md-5">
          <div className="app-bill">
            <div className="app-bill-header">
              <h3 className="title">{getAll("The_result_of")}</h3>
            </div>
            {isLoading && <Loading />}
            {query.return == 1 && !isError ? (
              <Alert type="success">{getAll("The_purchase_is")}</Alert>
            ) : (
              <Alert type="error">{getAll("Unfortunately_the_purchase")}</Alert>
            )}
            <div className="app-bill-content">
              {!isError && getBills && (
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    {getAll("Total_price")}
                    <span className="">
                      {specCurrency
                        ? Math.round(getBills?.cart?.total_price * specCurrency)
                        : getBills?.cart?.total_price}
                      {symbol}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    سعر التحويل
                    <span className="">
                      {specCurrency
                        ? Math.round(getBills?.cart?.tax * specCurrency)
                        : getBills?.cart?.tax}
                      {symbol}
                    </span>
                  </li>
                  <li className="list-group-item total d-flex justify-content-between align-items-center">
                    {getAll("Total_2")}
                    <span className="">
                      {specCurrency
                        ? Math.round(
                            getBills?.cart?.price_with_tax * specCurrency
                          )
                        : getBills?.cart?.price_with_tax}
                      {symbol}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
Paypal.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
Paypal.getInitialProps = async ({ query }) => {
  return { query };
};
Paypal.propTypes = {
  query: PropTypes.any,
};
export default Paypal;
