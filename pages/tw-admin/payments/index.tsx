import { ReactElement, useEffect } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import { motion } from "framer-motion";

import Link from "next/link";
import { MetaTags } from "@/components/SEO/MetaTags";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TypesPaymentActions } from "@/store/tw-admin/typesPayment/typespaymentActions";

function Countries(): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const types_payments = useAppSelector(state=> state.dashboardTypespaymentSlice)
  const dispatch = useAppDispatch()
  console.log(types_payments)
  useEffect(()=>{
    dispatch(TypesPaymentActions.getAll({}))
  },[])
  /*     const deleteHandle = (id: any) => {
        const MySwal = withReactContent(Swal)
        const swalWithBootstrapButtons = MySwal.mixin({
            customClass: {
                confirmButton: 'btn butt-red butt-sm me-1',
                cancelButton: 'btn butt-green butt-sm'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: {getAll("Are_you_sure")},
            text: {getAll("Are_you_sure")},
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: {getAll("Yes")}',
            cancelButtonText: {getAll("No")},
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await API.post(`dashboard/types_payments/${id}/delete`, null, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                } catch (error) {

                }
                swalWithBootstrapButtons.fire(
                    {getAll("Deleted")},
                    'لقد تم حذف هذا العنصر بنجاح',
                    'success'
                )
            }
        })

    } */
  const activateHandle = async (id: any) => {
    try {
        await dispatch(TypesPaymentActions.activateOne({id}))
        message.success(getAll("The_gateway_had"));
      
    } catch (error) {
      message.success(getAll("Unfortunately_the_gateway"));
    }
  };
  const disactivateHandle = async (id: any) => {
    try {
        dispatch(TypesPaymentActions.disactiveOne({id}))
        message.success(getAll("The_gateway_has"));
      
    } catch (error) {
      message.success(getAll("Unfortunately_the_gateway_2"));
    }
  };
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
      <MetaTags
        title={getAll("Genaral_administration_Payment")}
        metaDescription={getAll("Home_Payment_Gateways")}
        ogDescription={getAll("Home_Payment_Gateways")}
      />
      <div className="timlands-panel">
        <div className="timlands-panel-header d-flex align-items-center">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              payments
            </span>
            {getAll("Payment_gateways")}
          </h2>
          <div className="header-butt">
            <Link href={`/tw-admin/payments/add`}>
              <a className="btn butt-sm butt-green d-flex align-items-center">
                <span className="material-icons material-icons-outlined">
                  add_box
                </span>{" "}
                {getAll("Add_new")}
              </a>
            </Link>
          </div>
        </div>
        <div className="timlands-table">
          <table className="table">
            <thead>
              <tr>
                <th>{getAll("Gateway_name")}</th>
                <th>{getAll("Deduction_rate")}</th>
                <th>{getAll("Status")}</th>
                <th>{getAll("Tools")}</th>
              </tr>
            </thead>
            <tbody>
              {!types_payments.loading &&
                types_payments.data.map((e: any, i) => (
                  <motion.tr
                    initial="hidden"
                    variants={catVariants}
                    animate="visible"
                    custom={i}
                    key={e.id}
                  >
                    <td>{e.name_ar}</td>
                    <td>{e.precent_of_payment}</td>
                    <td>
                      {e.status == 0 ? getAll("Disabled") : getAll("Active")}
                    </td>
                    <td className="tools-col">
                      <Link href={`/tw-admin/payments/edit/${e.id}`}>
                        <button className="btn butt-xs2 mx-1 butt-green">
                          تعديل
                        </button>
                      </Link>

                      {e.status == 1 ? (
                        <button
                          onClick={() => disactivateHandle(e.id)}
                          className="btn butt-xs2 mx-1 butt-orange"
                        >
                          {getAll("Desactivation")}
                        </button>
                      ) : (
                        <button
                          onClick={() => activateHandle(e.id)}
                          className="btn butt-xs2 mx-1 butt-green"
                        >
                          {getAll("Activation")}
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
          {types_payments.error && (
            <Alert type="error">
              <p className="text">
                <span className="material-icons">warning_amber</span>{" "}
                {getAll("An_unexpected_error")}
              </p>
            </Alert>
          )}
          {types_payments.loading && (
            <motion.div
              initial={{ opacity: 0, y: 29 }}
              animate={{ opacity: 1, y: 0 }}
              className="d-flex py-5 justify-content-center"
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
Countries.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default Countries;
