import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import AddNewCountry from "./Modals/AddNewCountry";
import API from '../../../config';
import { motion } from "framer-motion";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from "next/link";
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'

function Countries(): ReactElement {
    const { data: GetData, error }: any = useSWR(`dashboard/countries?page=1`)

    const deleteHandle = (id: any) => {
        const MySwal = withReactContent(Swal)
        const swalWithBootstrapButtons = MySwal.mixin({
            customClass: {
                confirmButton: 'btn butt-red butt-sm me-1',
                cancelButton: 'btn butt-green butt-sm'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'هل أنت متأكد؟',
            text: "هل انت متأكد أنك تريد حذف هذا العنصر",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم, أريد الحذف',
            cancelButtonText: 'لا',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await API.post(`dashboard/countries/${id}/delete`)
                } catch (error) {
                    console.log(error);

                }
                swalWithBootstrapButtons.fire(
                    'تم الحذف!',
                    'لقد تم حذف هذا العنصر بنجاح',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'ملغى',
                    'تم الإلغاء',
                    'error'
                )
            }
        })

    }
    const [isModalShowen, setIsModalShowen] = useState(false)
    const setIsModalShowenHandle = () => {
        setIsModalShowen(true);
    }
    const setIsModalHiddenHandle = () => {
        setIsModalShowen(false);
    }
    const catVariants = {
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.072,
            },
        }),
        hidden: { opacity: 0, y: 9 },
    }
    // Return statement.
    return (
        <>
            <MetaTags
                title={" الإدارة العامة - البلدان"}
                metaDescription={"الصفحة الرئيسية - الإدارة العامة"}
                ogDescription={"الصفحة الرئيسية - الإدارة العامة"}
            />
            {isModalShowen && <AddNewCountry setIsModalHiddenHandle={setIsModalHiddenHandle} />}
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">map</span>البلدان</h2>
                    <div className="header-butt">
                        <button onClick={setIsModalShowenHandle} className="btn butt-sm butt-green d-flex align-items-center"><span className="material-icons material-icons-outlined">add_box</span> إضافة جديد</button>
                    </div>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th> اسم الدولة</th>
                                <th> الرمز</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetData && GetData.data.map((e: any, i) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td>
                                        {e.name_ar}
                                    </td>
                                    <td>{e.code_phone}</td>
                                    <td className="tools-col">
                                        <Link href={`/dashboard/cms/category/edit/${e.id}`}>
                                            <button className="table-del success">
                                                <span className="material-icons material-icons-outlined">edit</span>
                                            </button>
                                        </Link>
                                        <button onClick={() => deleteHandle(e.id)} className="table-del error">
                                            <span className="material-icons material-icons-outlined">delete</span>
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {error &&
                        <Alert type="error">
                            <p className="text"><span className="material-icons">warning_amber</span> حدث خطأ غير متوقع</p>
                        </Alert>}
                    {!GetData &&
                        <motion.div initial={{ opacity: 0, y: 29 }} animate={{ opacity: 1, y: 0 }} className="d-flex py-5 justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </motion.div>
                    }
                </div>
            </div>
        </>
    );
}
Countries.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export default Countries;
