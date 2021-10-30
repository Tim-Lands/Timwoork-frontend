import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import AddNewUser from "./Modals/AddNewUser";
import axios from "axios";
import { motion } from 'framer-motion'
import { Alert } from "../../../components/Alert/Alert";
import Link from 'next/link'
function index(): ReactElement {
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

    const [isModalShowen, setIsModalShowen] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const refreshData = async () => {
        setIsLoading(true)

        try {
            const res: any = await axios.get('https://flexyapp.herokuapp.com/api/v1/users')
            const json = res.data.content
            if (json) {
                setIsLoading(false)
                setUsers(json)
                setIsError(true)
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        refreshData()
    }, [])
    const setIsModalShowenHandle = () => {
        setIsModalShowen(true);
    }
    const setIsModalHiddenHandle = () => {
        setIsModalShowen(false);
        refreshData()
    }
    async function deleteHandle(id: any) {
        try {
            const res = await axios.delete("https://flexyapp.herokuapp.com/api/v1/users/" + id);
            // If Activate Network 
            // Authentication was successful.
            if (res.status == 202 || res.status == 201 || res.status == 200) {
                alert('تم الحذف بنجاح')
                refreshData()
            }
        } catch (error) {
            alert('حدث خطأ')
        }
    }
    // Return statement.
    return (
        <>
            {isModalShowen && <AddNewUser setIsModalHiddenHandle={setIsModalHiddenHandle} />}
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">people</span>إدارة الأعضاء</h2>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>الاسم واللقب</th>
                                <th className="hidden-tem">اسم المستخدم</th>
                                <th>الولاية</th>
                                <th className="hidden-tem">الحالة</th>
                                <th className="hidden-tem">متصل</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                    </table>
                    <Alert type="error">
                        <p className="text"><span className="material-icons">warning_amber</span> حدث خطأ غير متوقع</p>
                    </Alert>
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
