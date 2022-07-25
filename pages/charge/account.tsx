import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import { motion } from "framer-motion";

function ChargeAccount() {
  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"شحن رصيدك"}
        metaDescription={"شحن رصيدك"}
        ogDescription={"شحن رصيدك"}
      />
      <div className="portfolios-container">
        <div className="row justify-content-lg-center">
          <div className="col-lg-6">
            <div className="page-header">
              <h4 className="title">شحن رصيدك</h4>
            </div>
            <div className="p-3 bg-white portfolio-sidebar">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-duration">
                  المبلغ
                </label>
                <div className="rel-form">
                  <input
                    type="test"
                    placeholder="أكتب المبلغ هنا..."
                    id="input-duration"
                    maxLength={4}
                    pattern="[0-9]*"
                    name="duration"
                    className={"timlands-inputs select has-error"}
                    autoComplete="off"
                  />
                  <div className="timlands-form-label">
                    <p className="text">بالدولار ($)</p>
                  </div>
                </div>
                <motion.div
                  initial={{ y: -70, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="timlands-form-note"
                >
                  <p className="text" style={{ fontSize: 12, fontWeight: 200 }}>
                    مثال لنص هنا
                  </p>
                </motion.div>
              </div>
              <div className="charge-title">
                <h3 className="title">إختر طريقة الدفع</h3>
              </div>
              <div className="list-group charge-list-group list-group-radio d-grid gap-2 border-0 w-auto">
                <div className="row">
                  <div className="position-relative mb-2 col-md-6">
                    <input
                      className="form-check-input position-absolute top-50 end-0 me-4 fs-5"
                      type="radio"
                      name="chargeType"
                      id="charge-stripe"
                      value=""
                    />
                    <label
                      className="list-group-item py-3 pe-5"
                      htmlFor="charge-stripe"
                    >
                      <strong className="fw-semibold">البطاقات البنكية</strong>
                      <span className="d-block small opacity-75">
                        إدفع بأمان, إتصالك محمي و مشفر , يمكنك ادخال معلومات
                        بطاقتة بأمان
                      </span>
                    </label>
                  </div>
                  <div className="position-relative col-md-6">
                    <input
                      className="form-check-input position-absolute top-50 end-0 me-4 fs-5"
                      type="radio"
                      name="chargeType"
                      id="charge-paypal"
                      value=""
                    />
                    <label
                      className="list-group-item py-3 pe-5"
                      htmlFor="charge-paypal"
                    >
                      <strong className="fw-semibold">بايبال</strong>
                      <span className="d-block small opacity-75">
                        برجاء إرسال المبلغ المطلوب إلى timlands@gmail.com وبعدها
                        تواصل معناً
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="charge-form-footer">
                <button className="flex-center btn butt-md butt-primary">
                  <span className="material-icons material-icons-outlined">
                    publish
                  </span>
                  طلب الشحن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChargeAccount;
ChargeAccount.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
