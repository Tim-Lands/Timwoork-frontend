import { Alert } from "@/components/Alert/Alert";
import { motion } from "framer-motion";
import { ReactElement, useEffect} from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Result } from "antd";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { WithdrawalActions } from "@/store/tw-admin/withdrawals/withdrawalActions";

function index(): ReactElement {
  const withdrawalsState = useAppSelector(state=> state.dashboardWithdrawals)
  const data = withdrawalsState.data
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(WithdrawalActions.getAll({}))
  },[])

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
  const { getAll } = useAppSelector((state) => state.languages);

  // Return statement.
  return (
    <>
      <div className="timlands-panel">
        <div className="timlands-panel-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              collections_bookmark
            </span>
            {getAll("Withdrawal_requests")}
          </h2>
        </div>
        <div className="timlands-table">
          <table className="table">
            <thead>
              <tr>
                <th>{getAll("Amount_to_transfer")}</th>
                <th>{getAll("Date")}</th>
                <th>{getAll("Withdrawal_holder")}</th>
                <th>{getAll("His_her_withdrawabal")}</th>
                <th>{getAll("Tools")}</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((e: any, i) => (
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
                        <a> {getAll("Details")}</a>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
          {data && data.length == 0 && (
            <Result
              status="404"
              title={getAll("No_withdrawal_requests")}
              subTitle={getAll("In_this_case")}
            />
          )}

          {withdrawalsState.error && (
            <Alert type="error">
              <p className="text">
                <span className="material-icons">warning_amber</span>{" "}
                {getAll("An_unexpected_error_occurred")}
              </p>
            </Alert>
          )}
          {withdrawalsState.loading && (
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
