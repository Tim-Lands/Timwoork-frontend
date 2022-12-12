import { ReactElement, useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Pagination from "react-js-pagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ActivitiesActions } from "@/store/tw-admin/activities/activityActions";

const ActivityData = (activity, getAll) => {
  switch (activity.data.type) {
    case "order":
      return (
        <p>
          {" "}
          {activity?.data?.title} {getAll("Service_title")}
          <a href={`/p/${activity?.data?.content?.item_id}`}>
            {activity?.data?.content?.title}
          </a>{" "}
          , مقدمة من{" "}
          <a
            href={`/user/profile/${activity.user_id}`}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {activity.username}
          </a>
        </p>
      );
    case "rating":
      return (
        <p>
          {" "}
          قام <a href=""> {activity?.data?.user_sender?.full_name}</a> بتقييم
          خدمة {activity?.data?.content?.slug.split("-").slice(1).join(" ")}{" "}
          المُقدمة من{" "}
          <a
            href={`/user/profile/${activity?.user_id}`}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {activity?.username}
          </a>
        </p>
      );
    case "system":
      return (
        <p>
          إشعار من الإدارة إلى{" "}
          <a href={`/user/profile/${activity.user_id}`}>{activity.username}</a>{" "}
          : <a href={``}>{activity?.data?.title}</a>
        </p>
      );
    default:
      return activity.data.title;
  }
};
function index() {
  const { getAll } = useAppSelector((state) => state.languages);

  const [pageNumber, setPagenNumber]: any = useState(1);

  const [sentinel, setSentinel] = useState({ mount: true });
  const search: any = useRef(null);

  const { notifications } = useAppSelector(
    (state) => state.dashboardActivitiesSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      ActivitiesActions.getNotifications({
        page: pageNumber,
        search: search.current,
      })
    );
  }, [pageNumber, sentinel]);

  return (
    <>
      <div className="timlands-panel">
        <div className="timlands-panel-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              event_repeat
            </span>
            جميع النشاطات
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="py-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="timlands-form">
                    <input
                      id="input-sQuery"
                      name="sQuery"
                      placeholder={getAll("Search_in_table")}
                      className="timlands-inputs"
                      onChange={(e) => (search.current = e.target.value)}
                      onKeyDown={(e) => {
                        search.current = (
                          e.target as HTMLTextAreaElement
                        ).value;
                        if (e.keyCode === 13)
                          setSentinel({ ...sentinel, mount: true });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="activities-items">
              <ul className="activities-items-list">
                {notifications?.data?.map((activity) => (
                  <li key={activity.id}>
                    <span className="item-link">
                      <div className="activity-item-img">
                        <Image
                          src={
                            activity.data.user_sender?.avatar_path ||
                            activity.data.user_sender?.avatar_url ||
                            "/avatar.png"
                          }
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="activity-item">
                        {ActivityData(activity, getAll)}
                        <span className="meta">
                          <span className="material-icons material-icons-outlined">
                            schedule
                          </span>
                          <LastSeen date={activity.created_at} />
                        </span>
                      </div>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <hr />
              <Pagination
                activePage={pageNumber}
                itemsCountPerPage={notifications.per_page || 0}
                totalItemsCount={notifications?.total}
                onChange={(pageNumber) => {
                  setPagenNumber(pageNumber);
                }}
                pageRangeDisplayed={8}
                itemClass="page-item"
                linkClass="page-link"
                className="productPagination"
                firstPageText={getAll("First_page")}
                lastPageText={getAll("Last_page")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
