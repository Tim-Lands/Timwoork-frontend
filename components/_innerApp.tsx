import { useContext } from "react";
import { ConfigProvider } from "antd";
import PropTypes from "prop-types";

import { LanguageContext } from "../contexts/languageContext/context";
const App = ({ innerApp }) => {
  const { language } = useContext(LanguageContext);

  return (
    <ConfigProvider direction={`${language === "ar" ? "rtl" : "ltr"}`}>
      <div className={`${language === "ar" ? "rtl" : "ltr"}`}>{innerApp}</div>
    </ConfigProvider>
  );
};
App.propTypes = {
  innerApp: PropTypes.func,
};
export default App;
