import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import { ReactElement, useEffect, useState } from "react";
//import withAuth from '../../services/withAuth'
import { Spin } from "antd";
import { Alert } from "antd";
import useSWR from "swr";
import NotSeller from "@/components/NotSeller";
import Cookies from "js-cookie";
import Unauthorized from "@/components/Unauthorized";
import router from "next/router";
import API from "../../config";

function index() {
  let token = Cookies.get("token")
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  const [isLoading, setIsLoading]: any = useState(false);

  const addNewProduct = async () => {
    setIsLoading(true)
    try {
      const res = await API.get("api/product/store", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // If Activate Network
      // Authentication was successful.
      if (res.status === 200) {
        setIsLoading(false)
        router.push({
          pathname: `/add-new/overview`,
          query: {
            id: res.data.data.id, // pass the id
          },
        });
      }
    } catch (error) {
      setIsLoading(false)
      if (error.response && error.response.data) {
        setValidationsGeneral(error.response.data);
      }

    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);
  if (!token) return <Unauthorized />;
  const { data: userData }: any = useSWR(`api/me`);
  if (userData && userData.user_details.profile.is_seller == 0)
    return <NotSeller />;
  return (
    <>
      <MetaTags
        title="إضافة خدمة جديدة"
        metaDescription="إضافة خدمة جديدة"
        ogDescription="إضافة خدمة جديدة"
      />
      <div className="container">
        {token && veriedEmail && (
          <div className="row justify-content-center my-3">
            <div className="col-md-7">
              <Spin spinning={isLoading}>
                <div className="timlands-add-new">
                  {validationsGeneral.msg && (
                    <div style={{ textAlign: 'right', marginBottom: 16 }}>
                      <Alert
                        message="حدث خطأ"
                        description={validationsGeneral.msg}
                        type="error"
                        showIcon
                        closable
                      />
                    </div>
                  )}
                  <img src="/img/g10.png" alt="" className="add-new-image" />
                  <div className="timlands-add-new-body mt-3">
                    <h3 className="title">إضافة خدمة جديدة</h3>
                    <p className="text">
                      رائع ! وصلت الى خطوتك الأخيرة لتنظم الى فريق بائعي تيموورك
                    </p>
                    {!userData && (
                      <div className="add-butts">
                        <button
                          type="button"
                          disabled={true}
                          className="btn butt-md butt-white"
                          onClick={addNewProduct}
                        >
                          يرجى الإنتظار...
                        </button>
                      </div>
                    )}
                    {userData && userData.user_details.profile.is_seller == 1 && (
                      <div className="add-butts">
                        <button
                          type="button"
                          className="btn butt-md butt-primary2"
                          onClick={addNewProduct}
                        >
                          إضافة خدمة
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Spin>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};

export default index
