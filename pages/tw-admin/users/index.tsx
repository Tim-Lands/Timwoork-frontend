import { Alert } from "@/components/Alert/Alert";
import API from "../../../config";
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from "js-cookie";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import Image from "next/image";
import { notification, Space, Table } from "antd";
import SuspensionTimer from "@/components/SuspensionTimer";
import SuspensionPermanent from "@/components/SuspensionPermanent";
import Pagination from "react-js-pagination";

function index() {
  const [postsList, setPostsList] = useState({
    data: [],
    per_page: 10,
    total: 0,
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationSize, setPaginationSize] = useState(8);
  const [isShowSuspensionTimer, setIsShowSuspensionTimer] = useState(false);
  const [isShowSuspensionPermanent, setIsShowSuspensionPermanent] =
    useState(false);
  const [selectedUserID, setSelectedUserID]: any = useState(null);
  const [pageNumber, setPageNumber]: any = useState(1);
  const [username, setUsername] = useState("");
  const [sentinel, setSentinel] = useState({ mount: true });

  const token = Cookies.get("token_dash");

  useEffect(() => {
    refreshData();
  }, [pageNumber, sentinel]);

  useEffect(() => {
    if (window.innerWidth < 550) {
      setPaginationSize(2);
    }
    if (window.innerWidth > 550) {
      setPaginationSize(8);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 550) {
        setPaginationSize(2);
      }
      if (window.innerWidth > 550) {
        setPaginationSize(8);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 550) {
          setPaginationSize(2);
        }
        if (window.innerWidth > 550) {
          setPaginationSize(8);
        }
      });
    };
  }, []);

  const suspendUser = async (body) => {
    try {
      const res = await API.post(
        `dashboard/users/${selectedUserID}/ban`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200)
        notification.success({
          message: "تم حظر المُستخدم بنجاح",
        });
      setPostsList((posts) => ({
        ...posts,
        data: posts.data.filter((post) => post.id != selectedUserID),
      }));
    } catch (err) {
      () => {};
    }
  };

  const columns: any = [
    {
      title: "الاسم الكامل",
      dataIndex: ["profile"],
      render: (profile: any) => (
        <Link key={profile.id} href={`/u/${profile.id}`}>
          <a className="flex-center">
            <Image src={`${profile.avatar_path}`} width={20} height={20} />
            <span className="me-1">
              {!profile.full_name || profile.full_name == ""
                ? "بدون اسم"
                : profile.full_name}
            </span>
          </a>
        </Link>
      ),

      sorter: {
        compare: (a, b) =>
          a.profile.full_name
            ? a.profile.full_name.localeCompare(b.profile.full_name)
            : null,
        multiple: 3,
      },
      ellipsis: true,
    },
    {
      title: "البريد الإلكتروني",
      //className: 'column-money',
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 2,
      },
      onFilter: (value, record) => record.name.includes(value),
      ellipsis: true,
    },
    {
      title: "تاريخ التسجيل",
      //className: 'column-money',
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => <LastSeen key={date} date={date} />,
      sorter: {
        compare: (a, b) => a.created_at.localeCompare(b.created_at),
        multiple: 1,
      },
      ellipsis: true,
    },
    {
      title: "الأدوات",
      dataIndex: "",
      render: (item) => (
        <>
          <Space key={item.id}>
            <button
              className="btn butt-xs butt-dark"
              onClick={() => {
                setSelectedUserID(item.id);
                setIsShowSuspensionTimer(true);
              }}
              type="button"
            >
              تعليق مؤقت
            </button>
            <button
              title={item.id}
              className="btn butt-xs butt-red"
              onClick={() => {
                setSelectedUserID(item.id);
                setIsShowSuspensionPermanent(true);
              }}
              type="button"
            >
              تعليق دائم{" "}
            </button>
          </Space>
        </>
      ),
    },
  ];

  const refreshData = async () => {
    setIsLoading(true);
    const params = {
      page: pageNumber,
      like:
        username.length > 0
          ? [`username,${username}`, `email,${username}`]
          : null,
    };
    try {
      const res: any = await API.get("dashboard/users", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res) {
        setIsLoading(false);
        setPostsList(res.data.data);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  // Return statement.
  return (
    <>
      <div className="timlands-panel">
        <div className="timlands-panel-header d-flex align-items-center">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              people
            </span>
            إدارة الأعضاء
          </h2>
        </div>
        {isShowSuspensionTimer && (
          <SuspensionTimer
            onSuspend={suspendUser}
            refreshData={refreshData}
            id={3}
            setIsShowSuspensionTimer={setIsShowSuspensionTimer}
          />
        )}
        {isShowSuspensionPermanent && (
          <SuspensionPermanent
            onSuspend={suspendUser}
            refreshData={refreshData}
            id={3}
            setIsShowSuspensionPermanent={setIsShowSuspensionPermanent}
          />
        )}

        <div className="py-3">
          <div className="row">
            <div className="col-md-6">
              <div className="timlands-form">
                <input
                  id="input-sQuery"
                  name="sQuery"
                  placeholder="البحث في الجدول..."
                  className="timlands-inputs"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  onKeyDown={(e) =>
                    e.keyCode === 13 &&
                    setSentinel({ ...sentinel, mount: true })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={postsList?.data}
          pagination={false}
          bordered
        />
        <div>
          <hr />
          <Pagination
            activePage={pageNumber}
            itemsCountPerPage={postsList.per_page}
            totalItemsCount={postsList.total ? postsList.total : 0}
            onChange={() => setPageNumber((pageNO) => pageNO + 1)}
            pageRangeDisplayed={paginationSize}
            itemClass="page-item"
            linkClass="page-link"
            className="productPagination"
            firstPageText={"الصفحة الأولى"}
            lastPageText={"الصفحة الأخيرة"}
          />
        </div>
        {isError && (
          <Alert type="error">
            <p className="text">
              <span className="material-icons">warning_amber</span> حدث خطأ غير
              متوقع
            </p>
          </Alert>
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 29 }}
            animate={{ opacity: 1, y: 0 }}
            className="d-flex py-5 spinner-loader justify-content-center"
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
