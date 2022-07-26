import { Result } from "antd";
import Link from "next/link";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";
function NotFound() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  return (
    <div className="row justify-content-md-center">
      <div className="col-md-5">
        <Result
          status="warning"
          title={getAll("Page_not_found")}
          subTitle={getAll("Please_make_sure")}
          extra={
            <Link href="/">
              <a className="btn butt-primary butt-md">{getAll("Home")}</a>
            </Link>
          }
        />
      </div>
    </div>
  );
}

export default NotFound;
