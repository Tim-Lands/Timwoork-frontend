import { Alert } from "@/components/Alert/Alert";
import API from '../../../config';
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import { Result, Table } from "antd";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function index(): ReactElement {
    const [postsList, setPostsList] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const token = Cookies.get('token_dash')
    const columns: any = [
        {
            title: 'العنوان',
            dataIndex: "",
            render: (profile: any) => (
                <Link href={`/tw-admin/posts/${profile.id}`}>
                    <a>
                        {profile.title}
                    </a>
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'الحالة',
            dataIndex: ["status"],
            render: (status: any) => (
                switchStatus(status)
            ),
            ellipsis: true,
        },
        {
            title: 'التاريخ',
            dataIndex: ["created_at"],
            render: (created_at: any) => (
                <LastSeen date={created_at} />
            ),
            ellipsis: true,
        },
        {
            title: 'صاحب الخدمة',
            dataIndex: ["profile_seller"],
            render: (seller: any) => (
                <Link href={`/u/${seller.profile.user.username}`}>
                    <a>
                        {seller.profile.full_name}
                    </a>
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'صاحب الخدمة',
            dataIndex: "",
            render: (tes: any) => (
                <>
                    {(tes.status == 0 || tes.status == null) ?
                        <button title="تنشيط هذه الخدمة" onClick={() => activateProduct(tes.id)} className="table-del green">
                            <span className="material-icons material-icons-outlined">
                                check
                            </span>
                        </button> : ''
                    }
                    {(tes.status == 1) ?
                        <button title="تعطيل هذه الخدمة" onClick={() => rejectProduct(tes.id)} className="table-del warning">
                            <span className="material-icons material-icons-outlined">
                                cancel
                            </span>
                        </button> : ''
                    }
                    <button title="حذف هذه الخدمة" className="table-del error" onClick={() => deleteHandle(tes.id)}>
                        <span className="material-icons material-icons-outlined">
                            delete
                        </span>
                    </button>
                </>
            ),
            ellipsis: true,
        },
    ];

    const data = postsList && postsList;
    //const data = postsList && postsList;
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await API.get('dashboard/products', {
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

    const switchStatus = (status) => {
        switch (status) {
            case null:
                return (<span className="badge bg-warning text-dark">قيد الإنتظار</span>)
            case 0:
                return (<span className="badge bg-danger text-light">مرفوضة</span>)
            case 1:
                return (<span className="badge bg-success text-light">نشطة</span>)
        }
    }

    const deleteHandle = (id) => {
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
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const res: any = API.post(`dashboard/products/${id}/force_delete_product`)
                    if (res) {
                        refreshData()
                    }
                } catch (error) {
                    setIsError(true)
                    setIsLoading(false)
                }
                refreshData()
            } else if (
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
    const activateProduct = async (id: any) => {
        setIsLoading(true)
        try {
            const res: any = await API.post(`dashboard/products/${id}/activeProduct`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res) {
                setIsLoading(false)
                setIsError(false)
                refreshData()
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    const rejectProduct = async (id: any) => {
        setIsLoading(true)
        try {
            const res: any = await API.post(`dashboard/products/${id}/rejectProduct`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res) {
                setIsLoading(false)
                setIsError(false)
                refreshData()
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>إدارة الخدمات</h2>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                />
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>العنوان</th>
                                <th className="hidden-tem">الحالة</th>
                                <th className="hidden-tem">التاريخ</th>
                                <th>صاحب الخدمة</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList && postsList.map((e: any, i) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td>
                                        <Link href={`/tw-admin/posts/${e.id}`}>
                                            <a>
                                                {e.title}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="hidden-tem">{switchStatus(e.status)}</td>
                                    <td className="hidden-tem" title={e.created_at}><LastSeen date={e.created_at} /></td>
                                    <td title={e.profile_seller.profile.full_name}>
                                        <Link href={`/u/${e.profile_seller.profile.user.username}`}>
                                            <a>
                                                {e.profile_seller.profile.full_name}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="tools-col">
                                        {(e.status == 0 || e.status == null) ?
                                            <button title="تنشيط هذه الخدمة" onClick={() => activateProduct(e.id)} className="table-del green">
                                                <span className="material-icons material-icons-outlined">
                                                    check
                                                </span>
                                            </button> : ''
                                        }
                                        {(e.status == 1) ?
                                            <button title="تعطيل هذه الخدمة" onClick={() => rejectProduct(e.id)} className="table-del warning">
                                                <span className="material-icons material-icons-outlined">
                                                    cancel
                                                </span>
                                            </button> : ''
                                        }
                                        <button title="حذف هذه الخدمة" className="table-del error" onClick={() => deleteHandle(e.id)}>
                                            <span className="material-icons material-icons-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </td>
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
