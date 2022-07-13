import API from "../../../config";
import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from "js-cookie";
import useSWR from "swr";
import LastSeen from "@/components/LastSeen";
import router from "next/router";
import { message, Spin } from "antd";
import PropTypes from "prop-types";
import Link from "next/link";
import Loading from "@/components/Loading";

function Id({ query }) {
  const token = Cookies.get("token_dash");
  const { data: getData }: any = useSWR(`dashboard/withdrawals/${query.id}`);
  const [isShowCause, setIsShowCause] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cause, setCause] = useState("");
  const AcceptAmount = async (id: any) => {
    try {
      const res: any = await API.post(
        `dashboard/withdrawals/${id}/accept`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        router.push("/tw-admin/withdrawables");
      }
    } catch (error) {
      message.error("للأسف لم يتم القبول");
    }
  };
  const cancelAmount = async () => {
    setIsLoading(true);
    try {
      const res: any = await API.post(
        `dashboard/withdrawals/${query.id}/cancel`,
        { cause: cause },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        router.push("/tw-admin/withdrawables");
        message.success("لقد تم الرفض بنجاح");
        setIsLoading(false);
      }
    } catch (error) {
      message.error("للأسف لم يتم الرفض");
      setIsLoading(false);
    }
  };
  function switchType() {
    switch (getData && getData.data.type) {
      case 3:
        return "الحوالة المالية";
      case 2:
        return "التحويل البنكي";
      case 1:
        return "تحويل الوايز";
      case 0:
        return "تحويل بايبال";
      default:
        return "تحويل الوايز";
    }
  }
  return (
    <>
      {!getData && <Loading />}

      <div className="timlands-panel">
        {isShowCause && (
          <div className="timlands-modal-form">
            <Spin spinning={isLoading}>
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-title">
                  أذكر سبب الرفض
                </label>
                <textarea
                  id="input-title"
                  name="title"
                  placeholder="أذكر سبب الرفض..."
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
                  رفض
                </button>
                <button
                  className="btn butt-red butt-sm mx-1"
                  onClick={() => setIsShowCause(false)}
                >
                  إغلاق
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
              رفض هذا الطلب
            </button>

            <button
              className="btn butt-xs butt-green mx-1"
              onClick={() => AcceptAmount(getData && getData.data.id)}
            >
              قبول هذا الطلب
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="page-header">
              <h4 className="title">معلومات المعاملة المالية</h4>
            </div>
            {getData && getData.data.type == 2 && (
              <table className="table">
                <tbody>
                  <tr>
                    <th>المبلغ المراد تحويله: </th>
                    <td>{getData && getData.data.amount}$</td>
                  </tr>
                  <tr>
                    <th>نوع السحب: </th>
                    <td>{switchType()}</td>
                  </tr>
                  <tr>
                    <th>تاريخ السحب: </th>
                    <td>
                      <LastSeen date={getData && getData.data.created_at} />
                    </td>
                  </tr>
                  <tr>
                    <th>العنوان الشخصي: </th>
                    <td>
                      {getData && getData.data.withdrawalable.address_line_one}
                    </td>
                  </tr>
                  <tr>
                    <th>العنوان البنكي: </th>
                    <td>
                      {getData &&
                        getData.data.withdrawalable.bank_adress_line_one}
                    </td>
                  </tr>
                  <tr>
                    <th>الفرع البنكي: </th>
                    <td>
                      {getData && getData.data.withdrawalable.bank_branch}
                    </td>
                  </tr>
                  <tr>
                    <th>رقم IBAN</th>
                    <td>{getData && getData.data.withdrawalable.bank_iban}</td>
                  </tr>
                  <tr>
                    <th>اسم البنك: </th>
                    <td>{getData && getData.data.withdrawalable.bank_name}</td>
                  </tr>
                  <tr>
                    <th>الحساب البنكي: </th>
                    <td>
                      {getData &&
                        getData.data.withdrawalable.bank_number_account}
                    </td>
                  </tr>
                  <tr>
                    <th>كود السويفت SWIFT: </th>
                    <td>{getData && getData.data.withdrawalable.bank_swift}</td>
                  </tr>
                  <tr>
                    <th>المدينة: </th>
                    <td>{getData && getData.data.withdrawalable.city}</td>
                  </tr>
                  <tr>
                    <th>الرمز البريدي: </th>
                    <td>
                      {getData && getData.data.withdrawalable.code_postal}
                    </td>
                  </tr>
                  <tr>
                    <th>الاسم الكامل: </th>
                    <td>{getData && getData.data.withdrawalable.full_name}</td>
                  </tr>
                  <tr>
                    <th>رقم الهاتف: </th>
                    <td>
                      {getData &&
                        getData.data.withdrawalable.phone_number_without_code}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {getData && getData.data.type == 1 && (
              <table className="table">
                <tbody>
                  <tr>
                    <th>المبلغ المراد تحويله: </th>
                    <td>{getData && getData.data.amount}$</td>
                  </tr>
                  <tr>
                    <th>نوع السحب: </th>
                    <td>{switchType()}</td>
                  </tr>
                  <tr>
                    <th>تاريخ السحب: </th>
                    <td>
                      <LastSeen date={getData && getData.data.created_at} />
                    </td>
                  </tr>
                  <tr>
                    <th>البريد الإلكتروني: </th>
                    <td>{getData && getData.data.withdrawalable.email}</td>
                  </tr>
                </tbody>
              </table>
            )}
            {getData && getData.data.type == 0 && (
              <table className="table">
                <tbody>
                  <tr>
                    <th>المبلغ المراد تحويله: </th>
                    <td>{getData && getData.data.amount}$</td>
                  </tr>
                  <tr>
                    <th>نوع السحب: </th>
                    <td>{switchType()}</td>
                  </tr>
                  <tr>
                    <th>تاريخ السحب: </th>
                    <td>
                      <LastSeen date={getData && getData.data.created_at} />
                    </td>
                  </tr>
                  <tr>
                    <th>البريد الإلكتروني: </th>
                    <td>{getData && getData.data.withdrawalable.email}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="col-lg-6">
            <div className="page-header">
              <h4 className="title">معلومات طالب السحب</h4>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <th>الاسم الكامل: </th>
                  <td>
                    <Link
                      href={`/u/${
                        getData && getData.data.withdrawalable.profile.user_id
                      }`}
                    >
                      <a>
                        <img
                          width={20}
                          height={20}
                          style={{ marginInline: 4, borderRadius: "50%" }}
                          src={
                            getData &&
                            getData.data.withdrawalable.profile.avatar_path
                          }
                          alt={
                            getData &&
                            getData.data.withdrawalable.profile.full_name
                          }
                        />
                        {getData &&
                          getData.data.withdrawalable.profile.full_name}
                      </a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>الرصيد القابل للسحب: </th>
                  <td>
                    {getData &&
                      getData.data.withdrawalable.profile.withdrawable_amount}
                  </td>
                </tr>
                <tr>
                  <th>مستواه: </th>
                  <td>
                    {getData &&
                      getData.data.withdrawalable.profile.level &&
                      getData.data.withdrawalable.profile.level.name_ar}
                  </td>
                </tr>
                <tr>
                  <th>تاريخ الميلاد: </th>
                  <td>
                    {getData &&
                      getData.data.withdrawalable.profile.date_of_birth}{" "}
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
