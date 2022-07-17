import { Alert } from "@/components/Alert/Alert";
import API from "../../../config";
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from "js-cookie";
import { Result } from "antd";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";
function index(): ReactElement {
  const [postsList, setPostsList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("token_dash");
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res: any = await API.get("dashboard/withdrawals?type=0", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res) {
        setIsLoading(false);
        setPostsList(res.data.data.data);
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
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  // Return statement.
  return (
    <>
      <div className="timlands-panel">
        <div className="timlands-panel-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              collections_bookmark
            </span>
            {getLogin("Withdrawal_requests")}
          </h2>
        </div>
        <div className="timlands-table">
          <table className="table">
            <thead>
              <tr>
                <th>{getLogin("Amount_to_transfer")}</th>
                <th>{getAll("Date")}</th>
                <th>{getLogin("Withdrawal_holder")}</th>
                <th>{getLogin("His_her_withdrawabal")}</th>
                <th>{getLogin("Tools")}</th>
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
                    <td>{e.amount}</td>
                    <td>
                      <LastSeen date={e.created_at} />
                    </td>
                    <td>{e.withdrawalable.profile.full_name}</td>
                    <td>{e.withdrawalable.profile.withdrawable_amount}</td>
                    <td>
                      <Link href={`/tw-admin/withdrawables/${e.id}`}>
                        <a> {getLogin("Details")}</a>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
          {postsList && postsList.length == 0 && (
            <Result
              status="404"
              title={getLogin("No_withdrawal_requests")}
              subTitle={getLogin("In_this_case")}
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
