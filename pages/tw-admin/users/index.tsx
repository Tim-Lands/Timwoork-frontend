import { Alert } from "@/components/Alert/Alert";
import API from '../../../config';
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import { Result } from "antd";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import Image from "next/image";

function index() {
    const [postsList, setPostsList] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const token = Cookies.get('token_dash')

    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await API.get('dashboard/users', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res) {
                setIsLoading(false)
                setPostsList(res.data.data)
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
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">people</span>إدارة الأعضاء</h2>
                </div>

                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>العنوان</th>
                                <th className="hidden-tem">البريد الإلكتروني</th>
                                <th className="hidden-tem">تلريخ التسجيل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList && postsList.map((e: any, i) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td>
                                        <Link href={`/u/${e.username}`}>
                                            <a className="flex-center">
                                                <Image src={`${e.profile.avatar_url}`} width={20} height={20} />
                                                <span className="me-1">{(!e.profile.full_name || e.profile.full_name == '') ? 'بدون اسم' : e.profile.full_name}</span>
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="hidden-tem">{e.email}</td>
                                    <td className="hidden-tem" title={e.created_at}><LastSeen date={e.created_at} /></td>
                                    
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {postsList && postsList.length == 0 &&
                        <Result
                            status="404"
                            title="لا يوجد خدمات"
                            subTitle="في هذه الحالة لاتوجد خدمات"
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
