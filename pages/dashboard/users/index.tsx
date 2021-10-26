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
                <div className="my-2">
                    <Alert type="warning">
                        <p className="text"><span className="material-icons">warning_amber</span> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</p>
                    </Alert>
                </div>
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">people</span>إدارة الأعضاء</h2>
                    <div className="header-butt">
                        <button onClick={setIsModalShowenHandle} className="btn butt-sm butt-green d-flex align-items-center"><span className="material-icons material-icons-outlined">add_box</span> إضافة جديد</button>
                    </div>
                </div>
                <div className="timlands-table-filter">
                    <div className="row">
                        <div className="col-sm-4 filter-form">
                            <div className="form-container">
                                <input className="timlands-inputs" placeholder="البحث في الجدول..." name="filterStatus" />
                            </div>
                        </div>
                        <div className="col-sm-3 col-6 filter-form">
                            <div className="form-container">
                                <select className="timlands-inputs select" name="filterStatus">
                                    <option value="">اختر الولاية</option>
                                    <option value="">مفعل</option>
                                    <option value="">غير مفعل</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-3 col-6 filter-form">
                            <div className="form-container">
                                <select className="timlands-inputs select" name="filterStatus">
                                    <option value="">الحالة</option>
                                    <option value="">مفعل</option>
                                    <option value="">غير مفعل</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2 filter-form">
                            <div className="form-container">
                                <button className="btn butt-md butt-filter butt-primary">تصفية</button>
                            </div>
                        </div>
                    </div>
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
                        <tbody>
                            {users.map((e: any, i: number) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td>
                                        <Link href={"/users/" + e.id}>
                                            <a>
                                                {e.user.name}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="hidden-tem">{e.user.username}</td>
                                    <td>{e.user.address ? e.user.address.state : ''}</td>
                                    <td className="hidden-tem">{e.user.enabled ? <span className="badge bg-success">مفعل</span> : <span className="badge bg-danger">غير مفعل</span>}</td>
                                    <td className="hidden-tem">{e.user.isOnline ? <span className="badge bg-success">متصل</span> : <span className="badge bg-light text-dark">غير متصل</span>}</td>
                                    <td className="tools-col">
                                        <button className="table-del warning">
                                            <span className="material-icons material-icons-outlined">
                                                edit
                                            </span>
                                        </button>
                                        <button className="table-del error" onClick={() => deleteHandle(e.user.id)}>
                                            <span className="material-icons material-icons-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                        {isError &&
                            <Alert type="error">
                                <p className="text"><span className="material-icons">warning_amber</span> حدث خطأ غير متوقع</p>
                            </Alert>}

                    {isLoading &&
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

index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )

}
export default index;
