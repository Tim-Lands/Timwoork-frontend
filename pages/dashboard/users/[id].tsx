import { ReactElement, useEffect } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import axios from "axios";
import { motion } from 'framer-motion'
import { Alert } from "../../../components/Alert/Alert";

function TransfertID({ transfers, users }: any): ReactElement {
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
    useEffect(() => {
        console.log(transfers);
    }, [])
    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <Alert type="warning">
                    <p className="text"><span className="material-icons">warning_amber</span> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</p>
                </Alert>
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">people</span>إدارة الأعضاء</h2>
                </div>
                <div className="timlands-table-filter">
                    <div className="row">
                        <div className="col-sm-2 filter-form">
                            <div className="form-container">
                                <button className="btn butt-md butt-filter butt-primary">استرجاع رصيد</button>
                            </div>
                        </div>
                        <div className="col-sm-2 filter-form">
                            <div className="form-container">
                                <button className="btn butt-md butt-filter butt-primary">تسديد الديون</button>
                            </div>
                        </div>
                        <div className="col-sm-2 filter-form">
                            <div className="form-container">
                                <button className="btn butt-md butt-filter butt-primary">شحن رصيد</button>
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
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((e: any, i: number) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td>{e.user.name}</td>
                                    <td className="hidden-tem">{e.user.username}</td>
                                    <td>{e.user.address ? e.user.address.state : ''}</td>
                                    <td className="hidden-tem">{e.user.enabled ? <span className="badge bg-success">مفعل</span> : <span className="badge bg-danger">غير مفعل</span>}</td>
                                    <td className="hidden-tem">{e.user.isOnline ? <span className="badge bg-success">متصل</span> : <span className="badge bg-light text-dark">غير متصل</span>}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
TransfertID.getInitialProps = async (ctx: any) => {
    const res = await axios('https://flexyapp.herokuapp.com/api/v1/transfers/' + ctx.query.id)
    return { transfers: res }
}
TransfertID.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export default TransfertID;
