import { useContext, createContext, useState } from "react";
import { PusherContext } from "./pusherContext";
export const CurrencyContext = createContext(null);
export const CurrencyProvider = (props) => {
  const [, , currencyPusher] = useContext(PusherContext);
  currencyPusher.bind("SendCurrency", (data) => {
    console.log(data);
  });

  const [CurrenciesValue, setCurrenciesValue] = useState([]);
  return (
    <CurrencyContext.Provider value="">
      {props.children}
    </CurrencyContext.Provider>
  );
};
