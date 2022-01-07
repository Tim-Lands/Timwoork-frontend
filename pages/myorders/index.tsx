import Layout from '@/components/Layout/HomeLayout'
import React, { ReactElement } from 'react'
import { MetaTags } from '@/components/SEO/MetaTags';
import { Button, Tooltip } from 'antd';
import Link from 'next/link'
import useSWR from 'swr'
import Loading from '@/components/Loading';
import { Alert } from '@/components/Alert/Alert';

function index() {
    const { data: buysList, BuysError }: any = useSWR('api/my_purchases')
    const statusLabel = (status: any) => {
        switch (status) {
            case 0:
                return <span className='badge bg-secondary'>قيد الانتظار...</span>

            case 1:
                return <span className='badge bg-info text-dark'>قيد التنفيذ...</span>

            case 2:
                return <span className='badge bg-danger'>مرفوضة</span>

            case 3:
                return <span className='badge bg-success'>مكتملة</span>

            default:
                return <span className='badge bg-info text-dark'>قيد الانتظار...</span>
        }
    }
    return (
        <>
            <MetaTags
                title={'طلباتي - تيموورك'}
                metaDescription={'سلة المشتريات - تيموورك'}
                ogDescription={'سلة المشتريات - تيموورك'}
            />
            <div className="timwoork-single">
                <div className="row py-4 justify-content-center">
                    <div className="col-lg-10">
                        <div className="app-bill">
                            <div className="app-bill-header">
                                <h3 className="title">طلباتي</h3>
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
                                            <tr>
                                                <td>{statusLabel(e.status)} {e.title}</td>
                                                <td>{e.price_product}$</td>
                                                <td>
                                                    <p className="m-0">
                                                        <Link href={"/"}>
                                                            <a className='flex-center' style={{ color: "gray" }}>
                                                                <span className='mx-1'>{e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name}</span>
                                                            </a>
                                                        </Link>
                                                    </p>
                                                </td>
                                                <td>
                                                    {e.created_at}
                                                </td>
                                                <td>
                                                    <Tooltip title="حذف هذه الخدمة">
                                                        <Button danger type="primary" color='red' size="small" >رفض</Button>
                                                    </Tooltip>
                                                    <Tooltip title="تعديل الخدمة">
                                                        <Button type="default" color='orange' size="small">قبول</Button>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {!buysList && <Loading />}
                                {BuysError && <Alert type='error'>للأسف لم يتم جلب البيانات</Alert>}
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
