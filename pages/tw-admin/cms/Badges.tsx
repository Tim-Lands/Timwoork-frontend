import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import AddNewBadge from "./Modals/AddNewBadge";
import API from "../../../config";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

const { getSectionLanguage } = useContext(LanguageContext);
const getAll = getSectionLanguage("all");
const getLogin = getSectionLanguage("login");

function Badges(): ReactElement {
  const { data: GetData, error }: any = useSWR(`dashboard/badges`);

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
        title: getLogin("Are_you_sure1"),
        text: getLogin("Are_you_sure"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: getLogin("Yes"),
        cancelButtonText: getLogin("No"),
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await API.post(`dashboard/badges/${id}/delete`);
          } catch (error) {
            () => {};
          }
          swalWithBootstrapButtons.fire(
            getLogin("Deleted"),
            getLogin("The_service_has"),
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
        title={"الإدارة العامة - الشارات"}
        metaDescription={getLogin("Home_General_administration")}
        ogDescription={getLogin("Home_General_administration")}
      />
      {isModalShowen && (
        <AddNewBadge setIsModalHiddenHandle={setIsModalHiddenHandle} />
      )}
      <div className="timlands-panel">
        <div className="timlands-panel-header d-flex align-items-center">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              badge
            </span>
            {getLogin("Badges")}
          </h2>
          <div className="header-butt">
            <button
              onClick={setIsModalShowenHandle}
              className="btn butt-sm butt-green d-flex align-items-center"
            >
              <span className="material-icons material-icons-outlined">
                add_box
              </span>{" "}
              {getLogin("Add_new")}
            </button>
          </div>
        </div>
        <div className="timlands-table">
          <table className="table">
            <thead>
              <tr>
                <th>اسم الشارة</th>
                <th>نسبة العمولة</th>
                <th>{getLogin("Tools")}</th>
              </tr>
            </thead>
            <tbody>
              {GetData &&
                GetData.data.map((e: any, i) => (
                  <motion.tr
                    initial="hidden"
                    variants={catVariants}
                    animate="visible"
                    custom={i}
                    key={e.id}
                  >
                    <td>{e.name_ar}</td>
                    <td>{e.precent_deducation}%</td>
                    <td className="tools-col">
                      <Link href={"/tw-admin/cms/edit/badges/" + e.id}>
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
          {error && (
            <Alert type="error">
              <p className="text">
                <span className="material-icons">warning_amber</span>{" "}
                {getAll("An_unexpected_error_occurred")}
              </p>
            </Alert>
          )}
          {!GetData && (
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
Badges.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default Badges;
