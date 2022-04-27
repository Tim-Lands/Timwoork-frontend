import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import API from 'config';
import { motion } from "framer-motion";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from "next/link";
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Cookies from 'js-cookie'
import { message } from "antd";
import router from "next/router";

function Countries(): ReactElement {
    const { data: GetData, error }: any = useSWR(`dashboard/types_payments`)

    const token = Cookies.get('token_dash')
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
                    await API.post(`dashboard/types_payments/${id}/delete`, null, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                } catch (error) {
                    console.log(error);

                }
                swalWithBootstrapButtons.fire(
                    'تم الحذف!',
                    'لقد تم حذف هذا العنصر بنجاح',
                    'success'
                )
            }
        })

    }
    const activateHandle = async (id: any) => {
        try {
            const res = await API.post(`dashboard/types_payments/${id}/active_payment`, null, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                message.success('تم تنشيط البوابة بنجاح')
                router.reload()
            }
        } catch (error) {
            console.log(error);
            message.success('للأسف لم يتم تنشيط   البوابة')
        }
    }
    const disactivateHandle = async (id: any) => {
        try {
            const res = await API.post(`dashboard/types_payments/${id}/disactive_payment`, null, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                message.success('تم تعطيل البوابة بنجاح')
                router.reload()
            }
        } catch (error) {
            console.log(error);
            message.success('للأسف لم يتم تعطيل البوابة')
        }
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
                title={" الإدارة العامة - بوابات الدفع"}
                metaDescription={"الصفحة الرئيسية - بوابات الدفع"}
                ogDescription={"الصفحة الرئيسية - بوابات الدفع"}
            />
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">payments</span>بوابات الدفع</h2>
                    <div className="header-butt">
                        <Link href={`/tw-admin/payments/add`}>
                            <a className="btn butt-sm butt-green d-flex align-items-center">
                                <span className="material-icons material-icons-outlined">add_box</span> إضافة جديد
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>اسم البوابة</th>
                                <th>نسبة الإقتطاع</th>
                                <th>الحالة</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetData && GetData.data.map((e: any, i) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td>{e.name_ar}</td>
                                    <td>{e.precent_of_payment}</td>
                                    <td>{(e.status == 0) ? 'معطلة' : 'نشطة'}</td>
                                    <td className="tools-col">
                                        <Link href={`/tw-admin/payments/edit/${e.id}`}>
                                            <button className="btn butt-xs2 mx-1 butt-green">
                                                تعديل
                                            </button>
                                        </Link>
                                        <button onClick={() => deleteHandle(e.id)} className="btn butt-xs2 butt-red">
                                            حذف
                                        </button>
                                        {(e.status == 1) ?
                                            <button onClick={() => disactivateHandle(e.id)} className="btn butt-xs2 mx-1 butt-orange">
                                                تعطيل
                                            </button> :
                                            <button onClick={() => activateHandle(e.id)} className="btn butt-xs2 mx-1 butt-green">
                                                تنشيط
                                            </button>
                                        }
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
