import Link from "next/link";
import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import useSWR from "swr";
import { message } from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useAppSelector } from "@/store/hooks";

function index(): ReactElement {
  const { data: postsList, categoriesError }: any = useSWR("dashboard");
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <>
      <MetaTags
        title={getAll("Home_General_administration")}
        metaDescription={getAll("Home_General_administration")}
        ogDescription={getAll("Home_General_administration")}
      />
      <div className="timlands-panel">
        <div className="timlands-panel-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              dashboard
            </span>
            {getAll("Home")}
          </h2>
        </div>
        {categoriesError && message.error(getAll("An_error_occurred_2"))}
        {!postsList ? (
          ""
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="timlands-panel-item floated green">
                <div className="panel-item-body">
                  <div className="image-thumbnail">
                    <img
                      src="/icons/001-save-money.png"
                      className="mb-3"
                      alt=""
                    />
                  </div>
                  <div className="panel-content">
                    <h1 className="price-text">{getAll("Total_balance")}</h1>
                    <h1 className="price-num">
                      <span className="num-val">0.00$</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-panel-item floated blue">
                <div className="panel-item-body">
                  <div className="image-thumbnail">
                    <img src="/icons/002-money.png" className="mb-3" alt="" />
                  </div>
                  <div className="panel-content">
                    <h1 className="price-text">{getAll("Benefits")}</h1>
                    <h1 className="price-num">
                      <span className="num-val">0.00$</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="timlands-panel-item center">
                <div className="panel-item-header">
                  <h4 className="title">{getAll("Users")}</h4>
                </div>
                <div className="panel-item-body">
                  <ul className="details-items">
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">
                            {getAll("Supervisors_and_managers")}
                          </p>
                        </div>
                        <div className="det-val">
                          <p className="text">{postsList.data.admins}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">{getAll("Buyers")}</p>
                        </div>
                        <div className="det-val">
                          <p className="text">{postsList.data.buyers}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">{getAll("Sellers")}</p>
                        </div>
                        <div className="det-val">
                          <p className="text">{postsList.data.profile_sellers}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">{getAll("Total")}</p>
                        </div>
                        <div className="det-val">
                          <p className="text">{postsList.data.users}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="panel-item-footer">
                  <Link href="/">
                    <a className="btn butt-dark butt-sm">
                      {getAll("More_details")}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="timlands-panel-item center">
                <div className="panel-item-header">
                  <h4 className="title">{getAll("Services")}</h4>
                </div>
                <div className="panel-item-body">
                  <ul className="details-items">
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">
                            {getAll("Wating_for_activation")}
                          </p>
                        </div>
                        <div className="det-val">
                          <p className="text">
                            {postsList.data.products_wainting_actived}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">المرفوضة</p>
                        </div>
                        <div className="det-val">
                          <p className="text">
                            {postsList.data.products_rejected}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">{getAll("Active")}</p>
                        </div>
                        <div className="det-val">
                          <p className="text">
                            {postsList.data.products_actived}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">{getAll("Disabled")}</p>
                        </div>
                        <div className="det-val">
                          <p className="text">{postsList.data.products_disactived}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <div className="det-prop">
                          <p className="text">{getAll("Total")}</p>
                        </div>
                        <div className="det-val">
                          <p className="text">
                            {postsList.data.products_actived +
                              postsList.data.products_rejected +
                              postsList.data.products_wainting_actived}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="panel-item-footer">
                  <Link href="/">
                    <a className="btn butt-dark butt-sm">
                      {getAll("More_details")}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
