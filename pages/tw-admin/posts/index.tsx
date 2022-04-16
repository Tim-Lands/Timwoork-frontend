import API from '../../../config';
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import { Modal, Space, Table } from "antd";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function index(): ReactElement {
    const [postsList, setPostsList] = useState([])
    const [cause, setCause] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const token = Cookies.get('token_dash')

    const [validationsErrors, setValidationsErrors]: any = useState({})

    const data = postsList && postsList;
    //const data = postsList && postsList;
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await API.get('dashboard/products', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                setIsLoading(false)
                setPostsList(res.data.data)
            }
        } catch (error) {
            setIsLoading(false)
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationsErrors(error.response.data.errors);
            }
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
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
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
            width: 390
        },
        {
            title: 'الحالة',
            dataIndex: ["status"],
            render: (status: any) => (
                switchStatus(status)
            ),
            ellipsis: true,
            width: 90
        },
        {
            title: 'التاريخ',
            dataIndex: "created_at",
            
            render: (created_at: any) => (
                <LastSeen date={created_at} />
            ),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.created_at.startsWith(value),
            width: 150
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
            title: 'الأدوات',
            dataIndex: "",
            render: (tes: any) => (
                <Space>
                    {(tes.status == 0 || tes.status == null) ?
                        <button title="تنشيط هذه الخدمة" onClick={() => activateProduct(tes.id)} className="btn butt-xs2 butt-green">
                            تنشيط
                        </button> : ''
                    }
                    {(tes.status == 1) ?
                        <button title="تعطيل هذه الخدمة" onClick={() => rejectProduct(tes.id)} className="btn butt-xs2 butt-orange">
                            تعطيل
                        </button> : ''
                    }
                    <button title="حذف هذه الخدمة" className="btn butt-xs2 butt-red" onClick={() => deleteHandle(tes.id)}>
                        حذف
                    </button>
                    <button title="رفض الخدمة" className="btn butt-xs2 butt-orange" onClick={() => setIsModalVisible(true)}>
                        رفض
                    </button>
                    <Modal
                        title="Basic Modal"
                        visible={isModalVisible}
                        onOk={() => rejectProduct(tes.id)}
                        onCancel={() => setIsModalVisible(false)}
                        okText={''}
                    >
                        <div className="timlands-form">
                            <label className="label-block" htmlFor="cause">أكتب سبب رفض الخدمة</label>
                            <textarea
                                id="cause"
                                name="cause"
                                value={cause}
                                onChange={(e) => setCause(e.target.value)}
                                placeholder="أكتب سبب رفض الخدمة"
                                className="timlands-inputs"
                                autoComplete="off"
                            />
                            {validationsErrors && validationsErrors.cause &&
                                <div style={{ overflow: 'hidden' }}>
                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                        <p className="text">{validationsErrors.cause[0]}</p>
                                    </motion.div>
                                </div>}
                        </div>
                    </Modal>
                </Space>
            ),
            ellipsis: true,
        },
    ];
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
    const activateProduct = async (id: any) => {
        setIsLoading(true)
        try {
            const res: any = await API.post(`dashboard/products/${id}/activeProduct`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res) {
                setIsLoading(false)
                refreshData()
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    const rejectProduct = async (id: any) => {
        setIsLoading(true)
        try {
            const res: any = await API.post(`dashboard/products/${id}/rejectProduct`, { cause }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                setIsLoading(false)
                refreshData()
                setIsModalVisible(false)
            }
        } catch (error) {
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
                    onChange={onChange}
                    dataSource={data}
                    bordered
                    size='small'
                />
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
