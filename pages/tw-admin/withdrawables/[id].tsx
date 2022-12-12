import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import router from "next/router";
import { message, Spin } from "antd";
import PropTypes from "prop-types";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { WithdrawalActions } from "@/store/tw-admin/withdrawals/withdrawalActions";

function Id({ query }) {
  const [isShowCause, setIsShowCause] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cause, setCause] = useState("");
  const { getAll } = useAppSelector((state) => state.languages);
  const curr_withdrawal = useAppSelector(state=> state.dashboardWithdrawals.curr_withdrawal)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if (query.id)
    dispatch(WithdrawalActions.getOne({id:query.id}))
  },[query.id])
  const AcceptAmount = async (id: any) => {
    try {
        await dispatch(WithdrawalActions.accept({id}))
        router.push("/tw-admin/withdrawables");
      
    } catch (error) {
      message.error(getAll("Unfortunately_its_rejected"));
    }
  };
  const cancelAmount = async () => {
    setIsLoading(true);
    try {
      dispatch(WithdrawalActions.cancel({id:query.id, cause}))
      router.push("/tw-admin/withdrawables");
        
    } catch (error) {
      message.error(getAll("Unfortunately_it_was"));
      setIsLoading(false);
    }
  };
  function switchType() {
    switch (curr_withdrawal && curr_withdrawal.data?.type) {
      case 3:
        return getAll("Money_transfer");
      case 2:
        return getAll("Bank_transfer");
      case 1:
        return getAll("Wise_transfer");
      case 0:
        return getAll("PayPal_transfer");
      default:
        return getAll("Wise_transfer");
    }
  }
  return (
    <>
      {curr_withdrawal.loading && <Loading />}

      <div className="timlands-panel">
        {isShowCause && (
          <div className="timlands-modal-form">
            <Spin spinning={isLoading}>
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-title">
                  {getAll("State_the_reason")}
                </label>
                <textarea
                  id="input-title"
                  name="title"
                  placeholder={getAll("State_the_reason")}
                  className={"timlands-inputs"}
                  onChange={(e) => setCause(e.target.value)}
                  value={cause}
                />
              </div>
              <div className="py-2">
                <button
                  className="btn butt-primary butt-sm mx-1"
                  onClick={cancelAmount}
                >
                  {getAll("Rejection")}
                </button>
                <button
                  className="btn butt-red butt-sm mx-1"
                  onClick={() => setIsShowCause(false)}
                >
                  {getAll("Cancel_2")}
                </button>
              </div>
            </Spin>
          </div>
        )}
        <div className="timlands-panel-header flex-center">
          <h2 className="title me-auto">
            <span className="material-icons material-icons-outlined">
              collections_bookmark
            </span>{" "}
            عرض طلب السحب الواحد
          </h2>
          <div className="buttons ml-auto">
            <button
              className="btn butt-xs butt-red mx-1"
              onClick={() => setIsShowCause(true)}
            >
              {getAll("Reject_this_request")}
            </button>

            <button
              className="btn butt-xs butt-green mx-1"
              onClick={() => AcceptAmount(curr_withdrawal && curr_withdrawal.data?.id)}
            >
              {getAll("Accept_this_request")}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="page-header">
              <h4 className="title">
                {getAll("Financial_transaction_information")}
              </h4>
            </div>
            {curr_withdrawal.data && curr_withdrawal.data?.type == 2 && (
              <table className="table">
                <tbody>
                  <tr>
                    <th>{getAll("Amount_to_transfer")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.amount}$</td>
                  </tr>
                  <tr>
                    <th>{getAll("Transfer_type")}</th>
                    <td>{switchType()}</td>
                  </tr>
                  <tr>
                    <th>{getAll("Withdrawal_date")}</th>
                    <td>
                      <LastSeen date={curr_withdrawal && curr_withdrawal.data?.created_at} />
                    </td>
                  </tr>
                  <tr>
                    <th>{getAll("Personnal_address")}</th>
                    <td>
                      {curr_withdrawal && curr_withdrawal.data?.withdrawalable.address_line_one}
                    </td>
                  </tr>
                  <tr>
                    <th>{getAll("Bank_address")}</th>
                    <td>
                      {curr_withdrawal &&
                        curr_withdrawal.data?.withdrawalable.bank_adress_line_one}
                    </td>
                  </tr>
                  <tr>
                    <th>{getAll("Bank_branch")}</th>
                    <td>
                      {curr_withdrawal && curr_withdrawal.data?.withdrawalable.bank_branch}
                    </td>
                  </tr>
                  <tr>
                    <th>{getAll("IBAN")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.withdrawalable.bank_iban}</td>
                  </tr>
                  <tr>  
                    <th>{getAll("Bank_name")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.withdrawalable.bank_name}</td>
                  </tr>
                  <tr>
                    <th>{getAll("Bank_account")}</th>
                    <td>
                      {curr_withdrawal &&
                        curr_withdrawal.data?.withdrawalable.bank_number_account}
                    </td>
                  </tr>
                  <tr>
                    <th>{getAll("Swift_code")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.withdrawalable.bank_swift}</td>
                  </tr>
                  <tr>
                    <th>{getAll("City")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.withdrawalable.city}</td>
                  </tr>
                  <tr>
                    <th>{getAll("Postal_code")}</th>
                    <td>
                      {curr_withdrawal && curr_withdrawal.data?.withdrawalable.code_postal}
                    </td>
                  </tr>
                  <tr>
                    <th>{getAll("Full_name")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.withdrawalable.full_name}</td>
                  </tr>
                  <tr>
                    <th>{getAll("Phone_number")}</th>
                    <td>
                      {curr_withdrawal &&
                        curr_withdrawal.data?.withdrawalable.phone_number_without_code}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {curr_withdrawal.data && curr_withdrawal.data?.type == 1 && (
              <table className="table">
                <tbody>
                  <tr>
                    <th>{getAll("Amount_to_transfer")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.amount}$</td>
                  </tr>
                  <tr>
                    <th>{getAll("Transfer_type")}</th>
                    <td>{switchType()}</td>
                  </tr>
                  <tr>
                    <th>{getAll("Withdrawal_date")}</th>
                    <td>
                      <LastSeen date={curr_withdrawal && curr_withdrawal.data?.created_at} />
                    </td>
                  </tr>
                  <tr>
                    <th>{getAll("E_mail")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.withdrawalable.email}</td>
                  </tr>
                </tbody>
              </table>
            )}
            {curr_withdrawal.data && curr_withdrawal.data?.type == 0 && (
              <table className="table">
                <tbody>
                  <tr>
                    <th>{getAll("Amount_to_transfer")}</th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.amount}$</td>
                  </tr>
                  <tr>
                    <th>{getAll("Transfer_type")}</th>
                    <td>{switchType()}</td>
                  </tr>
                  <tr>
                    <th>{getAll("Withdrawal_date")}</th>
                    <td>
                      <LastSeen date={curr_withdrawal && curr_withdrawal.data?.created_at} />
                    </td>
                  </tr>
                  <tr>
                    <th>البريد الإلكتروني: </th>
                    <td>{curr_withdrawal && curr_withdrawal.data?.withdrawalable?.email}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="col-lg-6">
            <div className="page-header">
              <h4 className="title">
                {getAll("Withdrawal_requester_information")}
              </h4>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <th>{getAll("Full_name")}</th>
                  <td>
                    <Link
                      href={`/user/profile/${
                        curr_withdrawal.data && curr_withdrawal.data?.withdrawalable?.profile?.user_id
                      }`}
                    >
                      <a>
                        <img
                          width={20}
                          height={20}
                          style={{ marginInline: 4, borderRadius: "50%" }}
                          src={
                            curr_withdrawal.data &&
                            curr_withdrawal.data?.withdrawalable.profile.avatar_path
                          }
                          alt={
                            curr_withdrawal.data &&
                            curr_withdrawal.data?.withdrawalable.profile.full_name
                          }
                        />
                        {curr_withdrawal.data &&
                          curr_withdrawal.data?.withdrawalable.profile.full_name}
                      </a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>{getAll("Withdrawable_balance")}</th>
                  <td>
                    {curr_withdrawal.data &&
                      curr_withdrawal.data?.withdrawalable.profile.withdrawable_amount}
                  </td>
                </tr>
                <tr>
                  <th>{getAll("His_her_level")}</th>
                  <td>
                    {curr_withdrawal.data &&
                      curr_withdrawal.data?.withdrawalable.profile.level &&
                      curr_withdrawal.data?.withdrawalable.profile.level.name_ar}
                  </td>
                </tr>
                <tr>
                  <th>{getAll("Birthday")}</th>
                  <td>
                    {curr_withdrawal.data &&
                      curr_withdrawal.data?.withdrawalable.profile.date_of_birth}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
Id.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Id;
export async function getServerSideProps({ query }) {
  return { props: { query } };
}
Id.propTypes = {
  query: PropTypes.any,
};
