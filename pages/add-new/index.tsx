import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";
import { Alert } from "antd";
import NotSeller from "@/components/NotSeller";
import Unauthorized from "@/components/Unauthorized";
import router from "next/router";
import API from "../../config";

function index() {
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);

  const { getAll } = useAppSelector((state) => state.languages);

  const veriedEmail = user.email_verified;
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  const [isLoading, setIsLoading]: any = useState(false);

  const addNewProduct = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("api/product/store");

      setIsLoading(false);
      router.push({
        pathname: `/add-new/overview`,
        query: {
          id: res.data.data.id, // pass the id
        },
      });
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        setValidationsGeneral(error.response.data);
      }
    }
  };
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  if (!user.isLogged && !user.loading) return <Unauthorized />;
  if (profile.is_seller == 0) return <NotSeller />;
  return (
    <>
      <MetaTags
        title={getAll("Add_new_service")}
        metaDescription={getAll("Add_new_service")}
        ogDescription={getAll("Add_new_service")}
      />
      <div className="container">
        {user.isLogged && veriedEmail && (
          <div className="row justify-content-center my-3">
            <div className="col-md-7">
              <Spin spinning={isLoading}>
                <div className="timlands-add-new">
                  {validationsGeneral.msg && (
                    <div style={{ textAlign: "right", marginBottom: 16 }}>
                      <Alert
                        message={getAll("An_error_occurred")}
                        description={validationsGeneral.msg}
                        type="error"
                        showIcon
                        closable
                      />
                    </div>
                  )}
                  <img src="/img/g10.png" alt="" className="add-new-image" />
                  <div className="timlands-add-new-body mt-3">
                    <h3 className="title">{getAll("Add_new_service")}</h3>
                    <p className="text">{getAll("Super_You_have")}</p>
                    {!user.isLogged && (
                      <div className="add-butts">
                        <button
                          type="button"
                          disabled={true}
                          className="btn butt-md butt-white"
                          onClick={addNewProduct}
                        >
                          {getAll("Please_wait")}
                        </button>
                      </div>
                    )}
                    {profile.is_seller == 1 && (
                      <div className="add-butts">
                        <button
                          type="button"
                          className="btn butt-md butt-primary2"
                          onClick={addNewProduct}
                        >
                          {getAll("Add_a_service")}
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

export default index;
