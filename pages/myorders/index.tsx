import Layout from '@/components/Layout/HomeLayout'
import React, { ReactElement } from 'react'
import { MetaTags } from '@/components/SEO/MetaTags';
import { Button, Tooltip } from 'antd';
import Image from 'next/image'
import Link from 'next/link'
function index() {
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
                                            <th>الحالة</th>
                                            <th>الأدوات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className='badge bg-info text-dark'>قيد الانتظار...</span> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،</td>
                                            <td>5,754$</td>
                                            <td>
                                                <p className="m-0">
                                                    <Link href={"/"}>
                                                        <a className='flex-center' style={{ color: "gray" }}>
                                                            <Image
                                                                src={'/avatar2.jpg'}
                                                                quality={60}
                                                                width={24}
                                                                height={24}
                                                                placeholder='blur'
                                                                blurDataURL='/avatar2.jpg'
                                                            /><span className='mx-1'> عبد الله الهادي</span>
                                                        </a>
                                                    </Link>
                                                </p>
                                            </td>
                                            <td>
                                                منذ 4 دقائق
                                            </td>
                                            <td><span className='badge bg-info text-dark'>قيد الانتظار...</span></td>
                                            <td>
                                                <Tooltip title="حذف هذه الخدمة">
                                                    <Button danger type="primary" color='red' size="small" >رفض</Button>
                                                </Tooltip>
                                                <Tooltip title="تعديل الخدمة">
                                                    <Button type="default" color='orange' size="small">قبول</Button>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
