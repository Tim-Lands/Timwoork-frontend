import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import AddNewCountry from "./Modals/AddNewCountry";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CountriesActions } from "@/store/tw-admin/countries/countriesActions";

function Countries(): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const countriesState = useAppSelector(state=>state.dashboardCountriesSlice)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(CountriesActions.getAll({page:1}))
  },[])
  const deleteHandle = (id: any) => {
    const MySwal = withReactContent(Swal);
    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: "btn butt-red butt-sm me-1",
        cancelButton: "btn butt-green butt-sm",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: getAll("Are_you_sure1"),
        text: getAll("Are_you_sure"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: getAll("Yes"),
        cancelButtonText: getAll("No"),
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dispatch(CountriesActions.deleteOne({id}))
          } catch (error) {
            () => {};
          }
          swalWithBootstrapButtons.fire(
            getAll("Deleted"),
            getAll("The_service_has"),
            "success"
          );
        }
      });
  };
  const [isModalShowen, setIsModalShowen] = useState(false);
  const setIsModalShowenHandle = () => {
    setIsModalShowen(true);
  };
  const setIsModalHiddenHandle = () => {
    setIsModalShowen(false);
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
        title={" الإدارة العامة - البلدان"}
        metaDescription={getAll("Home_General_administration")}
        ogDescription={getAll("Home_General_administration")}
      />
      {isModalShowen && (
        <AddNewCountry setIsModalHiddenHandle={setIsModalHiddenHandle} />
      )}
      <div className="timlands-panel">
        <div className="timlands-panel-header d-flex align-items-center">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">map</span>
            {getAll("Countries")}
          </h2>
          <div className="header-butt">
            <button
              onClick={setIsModalShowenHandle}
              className="btn butt-sm butt-green d-flex align-items-center"
            >
              <span className="material-icons material-icons-outlined">
                add_box
              </span>{" "}
              {getAll("Add_new")}
            </button>
          </div>
        </div>
        <div className="timlands-table">
          <table className="table">
            <thead>
              <tr>
                <th> اسم الدولة</th>
                <th> الرمز</th>
                <th>{getAll("Tools")}</th>
              </tr>
            </thead>
            <tbody>
              {!countriesState.loading &&
                countriesState.data.map((e: any, i) => (
                  <motion.tr
                    initial="hidden"
                    variants={catVariants}
                    animate="visible"
                    custom={i}
                    key={e.id}
                  >
                    <td>{e.name}</td>
                    <td>{e.code_phone}</td>
                    <td className="tools-col">
                      <Link href={`/tw-admin/cms/category/edit/${e.id}`}>
                        <button className="table-del success">
                          <span className="material-icons material-icons-outlined">
                            edit
                          </span>
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteHandle(e.id)}
                        className="table-del error"
                      >
                        <span className="material-icons material-icons-outlined">
                          delete
                        </span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
          {countriesState.error && (
            <Alert type="error">
              <p className="text">
                <span className="material-icons">warning_amber</span>{" "}
                {getAll("An_unexpected_error_occurred")}
              </p>
            </Alert>
          )}
          {countriesState.loading && (
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
