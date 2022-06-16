import { useEffect, useContext, createContext, useState } from "react";
import { PusherContext } from "./pusherContext";
import API from "../config";
export const CurrencyContext = createContext(null);
export const CurrencyProvider = (props) => {
  const [, , currencyPusher] = useContext(PusherContext);
  currencyPusher.bind("SendCurrency", (data) => {});
  const [currencyValues, setCurrencyValues] = useState([]);
  useEffect(() => {
    API.get("api/currency_values")
      .then((data) => {
        setCurrencyValues(data.data.data);
      })
      .catch(() => {});
  });
  console.log(currencyValues);
  function getSpecCurrency(codeID: "USD") {
    const oneCurrency = [];
    currencyValues.forEach((currency) => {
      if (currency.code === codeID) {
        oneCurrency.push(currency);
      }
    });
    if (oneCurrency.length > 0) {
      return oneCurrency[0];
    } else {
      return false;
    }
  }
  return (
    <CurrencyContext.Provider value={[currencyValues, getSpecCurrency]}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
