import React, { ReactElement } from "react";
import Link from "next/link";
import { Result } from "antd";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

const SentToken = (): ReactElement => {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLogin = getSectionLanguage("login");
  return (
    <div className="row justify-content-md-center pt-5">
      <div className="col-lg-6 p-0">
        <div className="login-panel">
          <div className={"panel-modal-body login-panel-body auto-height"}>
            <div className="timwoork-logo">
              <Link href="/">
                <a>
                  <img src="/logo6.png" alt="" />
                </a>
              </Link>
            </div>
            <Result
              status="success"
              title="تم الإرسال"
              subTitle={getLogin("A_link_is")}
            />
            <div className="panel-modal-footer">
              <div className="d-flex">
                <Link href="/">
                  <a className="btn butt-default butt-md">
                    {getLogin("Go_to_Home")}
                  </a>
                </Link>
                <Link href="/login">
                  <a className="btn butt-primary butt-md">
                    {getLogin("Log_in")}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentToken;
