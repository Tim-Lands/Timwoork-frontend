import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import router from "next/router";
import PropTypes from "prop-types";
import { Alert } from "@/components/Alert/Alert";
import API from "../../config";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";

function Paypal({ query }) {
  const { getAll } = useAppSelector((state) => state.languages);
  const { value, symbol_native } = useAppSelector((state) => state.currency.my);

  const user = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [getBills, setGetBills]: any = useState({});

  const veriedEmail = user.email_verified;
  async function getBill() {
    setIsLoading(true);
    try {
      const res: any = await API.post(
        `api/purchase/paypal/charge`,
        { token: query.token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
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
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
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
                      {Math.round(getBills?.cart?.total_price * value) +
                        symbol_native}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    سعر التحويل
                    <span className="">
                      {Math.round(getBills?.cart?.tax * value) + symbol_native}
                    </span>
                  </li>
                  <li className="list-group-item total d-flex justify-content-between align-items-center">
                    {getAll("Total_2")}
                    <span className="">
                      {Math.round(getBills?.cart?.price_with_tax * value) +
                        symbol_native}
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
