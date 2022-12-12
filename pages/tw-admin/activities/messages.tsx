import { ReactElement, useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ActivitiesActions } from "@/store/tw-admin/activities/activityActions";

function index() {
  const { getAll } = useAppSelector((state) => state.languages);
  const [pageNumber, setPageNumber] = useState(1);
  const [sentinel, setSentinel] = useState({ mount: true });
  const email = useRef(null);
  const router = useRouter();

  const { conversations } = useAppSelector(
    (state) => state.dashboardActivitiesSlice
  );
  const dispatch = useAppDispatch();
  console.log(conversations);
  useEffect(() => {
    dispatch(
      ActivitiesActions.getConversations({
        page: pageNumber,
        email: email.current,
      })
    );
  }, [pageNumber, email.current]);

  return (
    <>
      <div className="timlands-panel">
        <div className="timlands-panel-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              event_repeat
            </span>
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
                      placeholder="إكتب بريد المُستخدم للبحث."
                      className="timlands-inputs"
                      onChange={(e) => (email.current = e.target.value)}
                      onKeyDown={(e) => {
                        email.current = (e.target as HTMLTextAreaElement).value;
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
                {conversations?.data?.map((message) => (
                  <li
                    key={message.id}
                    onClick={(e) => {
                      if ((e.target as HTMLTextAreaElement).classList[0])
                        router.push(
                          `/tw-admin/activities/conversation/${message.id}`
                        );
                    }}
                  >
                    <span className="item-link">
                      <div className="activity-item-img">
                        <Image src={"/avatar.png"} width={50} height={50} />
                      </div>
                      <div className="activity-item">
                        <a
                          href={`/user/profile/${message.members[0].id}`}
                          rel="noreferrer"
                          target="_blank"
                          className="u"
                        >
                          {message.members[0].username}
                        </a>
                        <span className="text">رسالة خاصة لـ </span>
                        <a
                          href={`/user/profile/${message.members[1].id}`}
                          rel="noreferrer"
                          target="_blank"
                          className="u"
                        >
                          {message.members[1].username}
                        </a>
                        <Link
                          href={`/tw-admin/activities/conversation/${message.id}`}
                        >
                          <a className="msg"> بشأن خدمة {message.title}</a>
                        </Link>
                        <span className="meta">
                          <span className="material-icons material-icons-outlined">
                            schedule
                          </span>
                          <LastSeen date={message.created_at} />
                        </span>
                      </div>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <hr />
            <Pagination
              activePage={pageNumber}
              itemsCountPerPage={conversations.per_page || 0}
              totalItemsCount={conversations?.total}
              onChange={(pageNumber) => {
                setPageNumber(pageNumber);
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
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
