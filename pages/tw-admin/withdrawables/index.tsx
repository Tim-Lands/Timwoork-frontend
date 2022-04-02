import { Alert } from "@/components/Alert/Alert";
import API from '../../../config';
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import { Result } from "antd";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
function index(): ReactElement {
    const [postsList, setPostsList] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const token = Cookies.get('token_dash')

    const AcceptAmount = async (id: any) => {
        try {
            const res: any = await API.post(`dashboard/withdrawals/${id}/accept`, null, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                refreshData()
            }
        } catch (error) {
            setIsError(true)
        }
    }
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await API.get('dashboard/withdrawals?type=0', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res) {
                setIsLoading(false)
                setPostsList(res.data.data.data)
                setIsError(false)
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        refreshData()
    }, [])
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
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>طلبات السحب</h2>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>المبلغ</th>
                                <th>التاريخ</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList && postsList.map((e: any, i) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td>{e.amount}</td>
                                    <td><LastSeen date={e.created_at} /></td>
                                    <td>
                                        <button
                                            className="btn butt-xs butt-green mx-1"
                                            onClick={() => AcceptAmount(e.id)}
                                        >
قبول                                            
                                        </button>
                                        <button
                                            className="btn butt-xs butt-red mx-1"
                                            onClick={() => AcceptAmount(e.id)}
                                        >
رفض
                                        </button>
                                        <Link href={`/tw-admin/withdrawables/${e.id}`}>
                                            <a> تفاصيل</a>
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {postsList && postsList.length == 0 &&
                        <Result
                            status="404"
                            title="لا يوجد طلبات سحب"
                            subTitle="في هذه الحالة لاتوجد طلبات سحب"
                        />}

                    {isError &&
                        <Alert type="error">
                            <p className="text"><span className="material-icons">warning_amber</span> حدث خطأ غير متوقع</p>
                        </Alert>}
                    {isLoading &&
                        <motion.div initial={{ opacity: 0, y: 29 }} animate={{ opacity: 1, y: 0 }} className="d-flex py-5 spinner-loader justify-content-center">
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
index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export default index;
