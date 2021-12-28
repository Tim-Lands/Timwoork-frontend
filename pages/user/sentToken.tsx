import React, { ReactElement } from "react";
import Link from "next/link";
import "antd/dist/antd.min.css";
import { Result } from "antd";

const SentToken = (): ReactElement => {

    return (
        <div className="row justify-content-md-center pt-5">
            <div className="col-lg-6 p-0">
                <div className="login-panel">
                    <div className={"panel-modal-body login-panel-body auto-height"}>
                        <Result
                            status="success"
                            title="تم الإرسال"
                            subTitle="لقد تم إرسال رابط إلى بريدك الإلكتروني"
                        />
                        <div className="panel-modal-footer">
                            <div className="d-flex">
                                <Link href="/">
                                    <a className="btn butt-default butt-md">الذهاب للرئيسية</a>
                                </Link>
                                <Link href="/login">
                                    <a className="btn butt-primary butt-md">تسجيل الدخول</a>
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
