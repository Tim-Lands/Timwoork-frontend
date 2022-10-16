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
import SuspensionInfo from "@/components/SuspensionInfo";
import Pagination from "react-js-pagination";
import { useAppSelector } from "@/store/hooks";

function suspondedspermanent() {
  const [postsList, setPostsList] = useState({
    data: [],
    per_page: 10,
    total: 0,
  });
  const [isError, setIsError] = useState(false);
  const [isShowSuspensionInfo, setIsShowSuspensionInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationSize, setPaginationSize] = useState(8);
  const [selectedUser, setSelectedUser]: any = useState(null);
  const [pageNumber, setPageNumber]: any = useState(1);
  const [username, setUsername] = useState("");
  const [sentinel, setSentinel] = useState({ mount: true });

  const token = Cookies.get("token_dash");
  const { getAll } = useAppSelector((state) => state.languages);

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

  const unSuspend = async (id) => {
    try {
      const res = await API.post(
        `dashboard/users/${id}/unban`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        notification.success({
          message: getAll("The_user_has"),
        });
        setPostsList((posts) => ({
          ...posts,
          data: posts.data.filter((post) => post.id != id),
        }));
      }
    } catch (err) {
      () => {};
    }
  };

  const columns: any = [
    {
      title: getAll("Full_name"),
      dataIndex: ["profile"],
      render: (profile: any) => (
        <Link key={profile.id} href={`/u/${profile.id}`}>
          <a className="flex-center">
            <Image src={`${profile.avatar_path}`} width={20} height={20} />
            <span className="me-1">
              {!profile.full_name || profile.full_name == ""
                ? getAll("Nameless")
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
      title: getAll("E_mail"),
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
      title: getAll("Registration_date"),
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
      title: getAll("Tools"),
      dataIndex: "",
      render: (item) => (
        <>
          <Space>
            <button
              title={item.id}
              onClick={() => unSuspend(item.id)}
              className="btn butt-xs butt-light"
              type="button"
            >
              {getAll("Stop_suspension")}
            </button>
            <button
              title={item.id}
              onClick={() => {
                setSelectedUser(item);
                setIsShowSuspensionInfo(true);
              }}
              className="btn butt-xs butt-green"
              type="button"
            >
              {getAll("Suspension_information")}
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
      const res: any = await API.get(
        "dashboard/users/get_users_banned?ban_permanent",
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
            {getAll("Accounts_permanently_suspended")}
          </h2>
        </div>
        {isShowSuspensionInfo && (
          <SuspensionInfo
            user={selectedUser}
            setIsShowSuspensionInfo={setIsShowSuspensionInfo}
          />
        )}

        <div className="py-3">
          <div className="row">
            <div className="col-md-6">
              <div className="timlands-form">
                <input
                  id="input-sQuery"
                  name="sQuery"
                  placeholder={getAll("Search_in_table")}
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
          dataSource={postsList.data}
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
            firstPageText={getAll("First_page")}
            lastPageText={getAll("Last_page")}
          />
        </div>
        {isError && (
          <Alert type="error">
            <p className="text">
              <span className="material-icons">warning_amber</span>{" "}
              {getAll("An_unexpected_error_occurred")}
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

suspondedspermanent.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default suspondedspermanent;
