import { Alert } from "@/components/Alert/Alert";
import API from '../../../config';
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import Image from "next/image";
import { Space, Table } from 'antd';
import SuspensionTimer from "@/components/SuspensionTimer";
import SuspensionPermanent from "@/components/SuspensionPermanent";

function index() {
    const [postsList, setPostsList] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isShowSuspensionTimer, setIsShowSuspensionTimer] = useState(false)
    const [isShowSuspensionPermanent, setIsShowSuspensionPermanent] = useState(false)
    const [sQuery, setsQuery] = useState('')

    const token = Cookies.get('token_dash')
    const columns: any = [
        {
            title: 'الاسم الكامل',
            dataIndex: ["profile"],
            render: (profile: any) => (
                <Link href={`/u/${profile.id}`}>
                    <a className="flex-center">
                        <Image src={`${profile.avatar_path}`} width={20} height={20} />
                        <span className="me-1">{(!profile.full_name || profile.full_name == '') ? 'بدون اسم' : profile.full_name}</span>
                    </a>
                </Link>
            ),

            sorter: {
                compare: (a, b) => a.profile.full_name - b.profile.full_name,
                multiple: 3,
            },
            ellipsis: true,
        },
        {
            title: 'البريد الإلكتروني',
            //className: 'column-money',
            dataIndex: "email",
            key: 'email',
            sorter: {
                compare: (a, b) => a.email - b.email,
                multiple: 2,
            },
            onFilter: (value, record) => record.name.includes(value),
            ellipsis: true,
        },
        {
            title: 'تاريخ التسجيل',
            //className: 'column-money',
            dataIndex: "created_at",
            key: 'created_at',
            render: date => <LastSeen date={date} />,
            sorter: {
                compare: (a, b) => a.created_at - b.created_at,
                multiple: 1,
            },
            ellipsis: true,
        },
        {
            title: 'الأدوات',
            dataIndex: "",
            render: item => (
                <>
                    <Space>
                        <button
                            className="btn butt-xs butt-dark"
                            onClick={() => setIsShowSuspensionTimer(true)}
                            type="button"
                        >تعليق مؤقت
                        </button>
                        <button
                            title={item.id}
                            className="btn butt-xs butt-red"
                            onClick={() => setIsShowSuspensionPermanent(true)}
                            type="button"

                        >تعليق دائم </button>
                    </Space>
                </>
            ),
        },
    ];

    const data = postsList && postsList;
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
    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">people</span>إدارة الأعضاء</h2>
                </div>
                {isShowSuspensionTimer && <SuspensionTimer refreshData={refreshData} id={3} setIsShowSuspensionTimer={setIsShowSuspensionTimer} />}
                {isShowSuspensionPermanent && <SuspensionPermanent refreshData={refreshData} id={3} setIsShowSuspensionPermanent={setIsShowSuspensionPermanent} />}

                <div className="py-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <input
                                    id="input-sQuery"
                                    name="sQuery"
                                    placeholder="البحث في الجدول..."
                                    className="timlands-inputs"
                                    onChange={(e) => setsQuery(e.target.value)}
                                    value={sQuery}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                />
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
