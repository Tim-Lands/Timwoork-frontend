import Layout from "@/components/Layout/HomeLayout";
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";
import { ReactElement, useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import useSWR, { useSWRConfig } from "swr";
import Cookies from "js-cookie";
import router from "next/router";
import API from "../../config";
import { Result } from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import Pagination from "react-js-pagination";

function index() {
  let token = Cookies.get("token");
  const { getSectionLanguage, language } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { mutate } = useSWRConfig();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: notifications }: any = useSWR(
    `api/notifications?page=${pageNumber}`
  );
  const [, setSize] = useState(4);

  const [paginationSize, setPaginationSize] = useState(8);
  // const fetchData = async (pageNumber: number = 1) => {
  //   try {
  //     // const res =
  //     await API.get(`api/filter?paginate=12&page=${pageNumber}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // if (res.status === 200) {
  //     // }
  //   } catch (error) {
  //     () => {};
  //   }
  // };
  async function markAllRead() {
    try {
      // const res =
      await API.post(
        `api/notifications/markAllAsRead`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate("api/me");
    } catch (error) {
      () => {};
    }

    mutate("api/me");
  }
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    markAllRead();
  }, []);
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
            {!notifications && <Loading />}
            {notifications && notifications.data.data.length == 0 && (
              <Result status="404" subTitle={getAll("You_have_no_2")} />
            )}
            <div className="notifications-panel">
              <div className="list-group">
                {notifications &&
                  notifications.data.data.map((e: any) => {
                    return (
                      <Notification
                        key={e.id}
                        title={e.data[whichTitle(language)]}
                        type={e.data.type}
                        item_id={e.data.content.item_id}
                        to={e.data.to}
                        avatar={e.data.user_sender.avatar_path}
                        created_at={e.created_at}
                        product_title={e.data.content[whichTitle(language)]}
                        slug={e.data.content.slug}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <Pagination
            activePage={
              notifications?.data?.current_page
                ? notifications?.data?.current_page
                : 0
            }
            itemsCountPerPage={
              notifications?.data?.per_page ? notifications?.data?.per_page : 0
            }
            totalItemsCount={
              notifications?.data?.total ? notifications?.data?.total : 0
            }
            onChange={(pageNumber) => {
              setPageNumber(pageNumber);
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
const whichTitle = (language) => {
  switch (language) {
    default:
      return "title_en";
    case "ar":
      return "title_ar";
    case "en":
      return "title_en";
    case "fr":
      return "title_fr";
  }
};
index.getLayout = function getLayout(page): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
