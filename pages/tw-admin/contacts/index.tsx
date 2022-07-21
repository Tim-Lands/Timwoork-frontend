import { Alert } from "@/components/Alert/Alert";
import API from "../../../config";
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from "js-cookie";
import { Result } from "antd";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import AddNewMessage from "@/components/AddNewMessage";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function index() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const [postsList, setPostsList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessageModal, setNewMessageModal] = useState(false);

  const token = Cookies.get("token_dash");

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res: any = await API.get("dashboard/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setIsLoading(false);
        setPostsList(res.data.data);

        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    refreshData();
  }, []);
  const catVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.072,
      },
    }),
    hidden: { opacity: 0, y: 9 },
  };
  // Return statement.
  return (
    <>
      {newMessageModal && (
        <AddNewMessage
          setIsConfirmText={setNewMessageModal}
          title={getLogin("Add_new_message")}
        />
      )}

      <div className="timlands-panel">
        <div className="timlands-panel-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              collections_bookmark
            </span>
            {getLogin("Services_management")}
          </h2>
          <div className="header-butt">
            <button
              className="btn butt-primary butt-sm flex-center"
              onClick={() => setNewMessageModal(true)}
            >
              <span className="material-icons material-icons-outlined">
                maps_ugc
              </span>
              {getLogin("Add_new_message")}
            </button>
          </div>
        </div>
        <div className="timlands-table">
          <table className="table">
            <thead>
              <tr>
                <th>{getLogin("Address")}</th>
                <th>{getLogin("E_mail")}</th>
                <th>{getLogin("Full_name")}</th>
                <th>{getAll("Date")}</th>
              </tr>
            </thead>
            <tbody>
              {postsList &&
                postsList.map((e: any, i) => (
                  <motion.tr
                    initial="hidden"
                    variants={catVariants}
                    animate="visible"
                    custom={i}
                    key={e.id}
                  >
                    <td>
                      <Link href={`/tw-admin/contacts/${e.id}`}>
                        <a>{e.subject}</a>
                      </Link>
                    </td>
                    <td>{e.email}</td>
                    <td>{e.full_name}</td>
                    <td title={e.created_at}>
                      <LastSeen date={e.created_at} />
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
          {postsList && postsList.length == 0 && (
            <Result
              status="404"
              title={getLogin("No_messages")}
              subTitle={getLogin("In_this_status")}
            />
          )}

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
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
