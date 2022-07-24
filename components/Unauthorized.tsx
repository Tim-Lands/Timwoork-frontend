import { Result } from "antd";
import Link from "next/link";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";
function Unauthorized() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  return (
    <div className="row justify-content-md-center">
      <div className="col-md-5">
        <Result
          status="warning"
          title={getAll("You_don’t_have")}
          subTitle={getAll("You_don’t_have_the")}
          extra={
            <Link href="/login">
              <a className="btn butt-primary butt-md">{getAll("Login_in")}</a>
            </Link>
          }
        />
      </div>
    </div>
  );
}

export default Unauthorized;
