import Layout from "@/components/Layout/HomeLayout";
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";
import { ReactElement, useEffect, useState } from "react";
import router from "next/router";
import { NotificationsActions } from "store/notifications/notificationsActions";
import API from "../../config";
import { Result } from "antd";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { MetaTags } from "@/components/SEO/MetaTags";
import Pagination from "react-js-pagination";

function index() {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll, language },
    user,
    notifications: { all: notification },
  } = useAppSelector((state) => state);

  const [, setSize] = useState(4);

  const [paginationSize, setPaginationSize] = useState(8);

  async function markAllRead() {
    try {
      // const res =
      await API.post(`api/notifications/markAllAsRead`);
    } catch (error) {
      () => {};
    }
  }
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
    markAllRead();
  }, [user]);
  useEffect(() => {
    if (window.innerWidth > 950) {
      setSize(4);
    }
    if (window.innerWidth < 950) {
      setSize(6);
    }
    if (window.innerWidth < 550) {
      setPaginationSize(2);
    }
    if (window.innerWidth > 550) {
      setPaginationSize(8);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 950) {
        setSize(4);
      }
      if (window.innerWidth < 950) {
        setSize(6);
      }
      if (window.innerWidth < 550) {
        setPaginationSize(2);
      }
      if (window.innerWidth > 550) {
        setPaginationSize(8);
      }
    });
    // fetchData();
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 950) {
          setSize(4);
        }
        if (window.innerWidth < 950) {
          setSize(6);
        }
        if (window.innerWidth < 550) {
          setPaginationSize(2);
        }
        if (window.innerWidth > 550) {
          setPaginationSize(8);
        }
      });
    };
  }, []);
  return (
    <div className="my-2 py-4">
      <MetaTags />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="app-bill">
            <div className="app-bill-header"></div>
            {notification.loading && <Loading />}
            {notification.data.length == 0 && !notification.loading && (
              <Result status="404" subTitle={getAll("You_have_no_2")} />
            )}
            <div className="notifications-panel">
              <div className="list-group">
                {notification.data.map((e: any) => {
                  return (
                    <Notification
                      key={e.id}
                      title={e.data[`title_${language}`] || e.data.title}
                      type={e.data.type}
                      item_id={e.data.content.item_id}
                      to={e.data.to}
                      avatar={e.data.user_sender.avatar_path}
                      created_at={e.created_at}
                      product_title={
                        e.data.content[`title_${language}`] ||
                        e.data?.content?.cause
                      }
                      slug={e.data.content.slug}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <Pagination
            activePage={notification.current_page}
            itemsCountPerPage={notification.per_page}
            totalItemsCount={notification.total}
            onChange={(pageNumber) => {
              dispatch(NotificationsActions.setPage(pageNumber));
            }}
            pageRangeDisplayed={paginationSize}
            itemClass="page-item"
            linkClass="page-link"
            className="productPagination"
          />
        </div>
      </div>
    </div>
  );
}

index.getLayout = function getLayout(page): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
