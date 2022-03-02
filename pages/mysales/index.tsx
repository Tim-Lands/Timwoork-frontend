import Layout from '@/components/Layout/HomeLayout'
import React, { ReactElement, useState } from 'react'
import { MetaTags } from '@/components/SEO/MetaTags';
import { Button, Result, Tooltip } from 'antd';
import Link from 'next/link'
import useSWR from 'swr'
import Loading from '@/components/Loading';
import { Alert } from '@/components/Alert/Alert';
import LastSeen from '@/components/LastSeen';
import API from '../../config'
import Cookies from 'js-cookie'
import router from 'next/router';
function index() {
    const token = Cookies.get('token')
    const [pageIndex, setPageIndex] = useState(1)
    const [acceptedBySellerLoading, setAcceptedBySellerLoading] = useState(false)
    const [rejectedBySellerLoading, setRejectedBySellerLoading] = useState(false)

    const { data: buysList, BuysError }: any = useSWR(`api/my_sales?page=${pageIndex}`)
    const item_accepted_by_seller = async (id: any) => {
        setAcceptedBySellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/item_accepted_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                router.reload()
            }
        } catch (error) {
            setAcceptedBySellerLoading(false)
        }
    }
    const item_rejected_by_seller = async (id: any) => {
        setRejectedBySellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/item_rejected_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                router.reload()
            }
        } catch (error) {
            setRejectedBySellerLoading(false)
        }
    }
    const statusLabel = (status: any) => {
        switch (status) {
            case 0:
                return <span className='badge bg-secondary'>قيد الانتظار...</span>

            case 1:
                return <span className='badge bg-warning'>ملغية من طرف المشتري</span>

            case 2:
                return <span className='badge bg-danger'>مرفوضة من طرف البائع</span>

            case 3:
                return <span className='badge bg-info text-dark'>قيد التنفيذ...</span>

            case 4:
                return <span className='badge bg-warning'>طلب إلغاء من طرف المشتري</span>

            case 5:
                return <span className='badge bg-warning'>ملغية من طرف البائع</span>

            case 6:
                return <span className='badge bg-primary'>قيد الإستلام</span>

            case 7:
                return <span className='badge bg-dark text-light'>مكتملة</span>

            case 8:
                return <span className='badge bg-danger text-light'>معلقة</span>

            case 9:
                return <span className='badge bg-light text-dark'>حالة طلب تعديل</span>

            case 10:
                return <span className='badge bg-danger text-light'>معلقة بسبب رفض التعديل</span>

            default:
                return <span className='badge bg-info text-dark'>قيد الانتظار...</span>
        }
    }
    return (
        <>
            <MetaTags
                title={'مبيعاتي'}
                metaDescription={'مبيعاتي'}
                ogDescription={'مبيعاتي'}
            />
            <div className="timwoork-single">
                <div className="row py-4 justify-content-center">
                    <div className="col-lg-10">
                        <div className="app-bill">
                            <div className="app-bill-header">
                                <h3 className="title">مبيعاتي</h3>
                            </div>
                            <div className="timlands-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>العنوان</th>
                                            <th>السعر الكلي</th>
                                            <th>المشتري</th>
                                            <th>التاريخ</th>
                                            <th>الأدوات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buysList && buysList.data.data.map((e: any) => (
                                            <tr key={e.id}>
                                                <td className='is-hover-primary'>
                                                    <Link href={`/mysales/${e.id}`}>
                                                        <a className='text-dark'>
                                                            {statusLabel(e.status)} {e.title}
                                                        </a>
                                                    </Link>
                                                </td>
                                                <td>{e.price_product}$</td>
                                                <td>
                                                    <p className="m-0 is-hover-primary">
                                                        <Link href={`/u/${e.profile_seller.profile.user.username}`}>
                                                            <a className='flex-center' style={{ color: "gray" }}>
                                                                <span className='mx-1'>{e.order.cart.user.profile.full_name}</span>
                                                            </a>
                                                        </Link>
                                                    </p>
                                                </td>
                                                <td>
                                                    <LastSeen date={e.created_at} />
                                                </td>
                                                <td>
                                                    {e.status == 0 ?
                                                        <>
                                                            <Tooltip title="رفض الطلبية">
                                                                <Button
                                                                    disabled={rejectedBySellerLoading}
                                                                    onClick={() => item_rejected_by_seller(e.id)}
                                                                    danger
                                                                    type="primary"
                                                                    color='red'
                                                                    size="small"
                                                                >رفض</Button>
                                                            </Tooltip>

                                                            <Tooltip title="قبول الطلبية">
                                                                <Button
                                                                    disabled={acceptedBySellerLoading}
                                                                    onClick={() => item_accepted_by_seller(e.id)}
                                                                    type="primary"
                                                                    color='green'
                                                                    size="small"
                                                                >قبول</Button>
                                                            </Tooltip>
                                                        </> : null
                                                    }
                                                    {e.status > 0 && statusLabel(e.status)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {buysList && buysList.data.data.length == 0 && <Result
                                    status="404"
                                    title="لا يوجد لديك مبيعات"
                                    subTitle="ليس لديك مبيعات لعرضها"
                                />}
                                {!buysList && <Loading />}
                                {BuysError && <Alert type='error'>للأسف لم يتم جلب البيانات</Alert>}
                                {buysList && buysList.data.data.length !== 0 && buysList.data.total > buysList.data.per_page && <div className="p-2 d-flex">
                                    <button className='btn butt-sm butt-primary me-auto' onClick={() => setPageIndex(pageIndex - 1)}>الصفحة السابقة</button>
                                    <button className='btn butt-sm butt-primary' onClick={() => setPageIndex(pageIndex + 1)}>الصفحة التالية</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index
