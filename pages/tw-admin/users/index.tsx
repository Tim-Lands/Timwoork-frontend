import { Alert } from "@/components/Alert/Alert";
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import Image from "next/image";
import { message, notification, Space, Table } from "antd";
import SuspensionTimer from "@/components/SuspensionTimer";
import SuspensionPermanent from "@/components/SuspensionPermanent";
import Pagination from "react-js-pagination";
import EmailModalCause from "@/components/EmailModalCause";
import SendNotification from "@/components/SendNotification";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UserActions } from "@/store/tw-admin/users/UserActions";
import { UsersService } from "@/services/tw-admin/usersService";

function index() {
  const [paginationSize, setPaginationSize] = useState(8);
  const [isShowSuspensionTimer, setIsShowSuspensionTimer] = useState(false);
  const [isShowSuspensionPermanent, setIsShowSuspensionPermanent] =
    useState(false);
  const [selectedUserID, setSelectedUserID]: any = useState(null);
  const [pageNumber, setPageNumber]: any = useState(1);
  const [search, setSearch]: any = useState('')

  const [cause, setCause] = useState("");

  const [sentinel, setSentinel] = useState({ mount: true });
  const [isNotifyModalVisible, setIsNotifyModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const { getAll } = useAppSelector((state) => state.languages);
  const usersState = useAppSelector(state=>state.dashboardUsers)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(UserActions.getAllUsers({page:pageNumber, search}))

  },[pageNumber, sentinel])

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


  const suspendUser = async (body:any) => {
    try {
     dispatch(UserActions.banUser({id:selectedUserID, comment:body.comment, expired_at:body.expired_at}))
    } catch (err) {
      console.log(err)
      message.error(err.message)
    }
  };

  const columns: any = [
    {
      title: getAll("Full_name"),
      dataIndex: "",
      render: (e: any) => (
        <Link key={e.id} href={`/u/${e.id}`}>
          <a className="flex-center">
            <Image src={`${e.profile.avatar_path}`} width={20} height={20} />
            <span className="me-1">
              {!e.profile.full_name || e.profile.full_name == ""
                ? getAll("Nameless")
                : e.profile.full_name}
            </span>
          </a>
        </Link>
      ),

      sorter: {
        compare: (a, b) =>
          a.profile.full_name
            ? a.profile.full_name.localeCompare(b.profile.full_name)
            : null,
        multiple: 4,
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
        multiple: 3,
      },
      onFilter: (value, record) => record.name.includes(value),
      ellipsis: true,
    },
    {
      title: getAll("Phone"),
      dataIndex: "phone",
      key: "phone",
      sorter: {
        compare: (a, b) => a.phone?.localeCompare(b.phone),
        multiple: 2,
      },
      ellipsis: true,
      width: 120,
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
      width: 120,
    },
    {
      title: getAll("Tools"),
      dataIndex: "",
      render: (item) => (
        <>
          <Space key={item.id}>
            <button
              className="btn butt-xs2 butt-dark"
              onClick={() => {
                setSelectedUserID(item.id);
                setIsShowSuspensionTimer(true);
              }}
              type="button"
            >
              {getAll("Temporary_suspension")}
            </button>
            <button
              title={item.id}
              className="btn butt-xs2 butt-red"
              onClick={() => {
                setSelectedUserID(item.id);
                setIsShowSuspensionPermanent(true);
              }}
              type="button"
            >
              {getAll("Permanent_suspension")}{" "}
            </button>
            <button
              title={getAll("Send_e_mail")}
              className="btn butt-xs2 butt-blue"
              onClick={() => setIsNotifyModalVisible(true)}
            >
              {getAll("Send_e_mail")}
            </button>
            <button
              title={getAll("Send_notification")}
              className="btn butt-xs2 butt-green"
              onClick={() => {
                setSelectedUserID(item.id);
                setIsEmailModalVisible(true);
              }}
            >
              {getAll("Send_notification")}
            </button>
          </Space>
        </>
      ),
    },
  ];

  const sendNotification = async () => {
    try {
      await UsersService.sendNotification({cause, id: selectedUserID})
      notification.success({ message: getAll("The_notification_was") });
    } catch (err) {
      console.log(err);
      notification.warning({ message: getAll("An_error_occured") });
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
            {getAll("Members_management")}
          </h2>
        </div>
        {isEmailModalVisible && (
          <EmailModalCause
            setIsConfirmText={setIsEmailModalVisible}
            handleFunc={() => sendNotification()}
            title={getAll("User_notification")}
            msg={cause}
            setMsg={(e) => setCause(e)}
          />
        )}
        {isNotifyModalVisible && (
          <SendNotification
            setIsConfirmText={setIsNotifyModalVisible}
            title={getAll("Send_e_mail_to")}
          />
        )}
        {isShowSuspensionTimer && (
          <SuspensionTimer
            onSuspend={suspendUser}
            id={3}
            setIsShowSuspensionTimer={setIsShowSuspensionTimer}
          />
        )}
        {isShowSuspensionPermanent && (
          <SuspensionPermanent
            onSuspend={suspendUser}
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
                  placeholder={getAll("Search_in_table")}
                  className="timlands-inputs"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
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
          dataSource={usersState.users}
          pagination={false}
          bordered
          size="small"
          loading={usersState.loading}
        />
        <div>
          <hr />
          <Pagination
            activePage={usersState.page}
            itemsCountPerPage={usersState.per_page}
            totalItemsCount={usersState.total ? usersState.total : 0}
            onChange={(page) => setPageNumber(page)}
            pageRangeDisplayed={paginationSize}
            itemClass="page-item"
            linkClass="page-link"
            className="productPagination"
            firstPageText={getAll("First_page")}
            lastPageText={getAll("Last_page")}
          />
        </div>
        {usersState.error && (
          <Alert type="error">
            <p className="text">
              <span className="material-icons">warning_amber</span>{" "}
              {getAll("An_unexpected_error_occurred")}
            </p>
          </Alert>
        )}
        {usersState.loading && (
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
