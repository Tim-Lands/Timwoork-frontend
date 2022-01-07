import Layout from '@/components/Layout/HomeLayout'
import React, { ReactElement, useState } from 'react'
import { MetaTags } from '@/components/SEO/MetaTags';
import { Button, Tooltip } from 'antd';
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import Loading from '@/components/Loading';
import { Alert } from '@/components/Alert/Alert';
import LastSeen from '@/components/LastSeen';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import API from '../../config'
import Cookies from 'js-cookie'

function index() {
    const token = Cookies.get('token')
    const [pageIndex, setPageIndex] = useState(0);
    const { data: buysList, BuysError }: any = useSWR(`api/my_purchases?page=${pageIndex}`)

    const [rejectLoading, setrejectLoading] = useState(false)
    const rejectHandle = (id: any) => {
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
            text: "هل انت متأكد أنك تريد إلغاء هذه الطلبية",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم, أريد الإلغاء',
            cancelButtonText: 'لا',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                setrejectLoading(true)
                try {
                    const res = await API.post(`api/order/items/${id}/reject_item_anyone`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (res.status === 200) {
                        mutate('api/my_purchases')
                        setrejectLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                    setrejectLoading(false)
                }
                swalWithBootstrapButtons.fire(
                    'تم الإلغاء!',
                    'لقد تم إلغاء هذه الطلبية بنجاح',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                setrejectLoading(false)
                swalWithBootstrapButtons.fire(
                    'ملغى',
                    'تم الإلغاء',
                    'error'
                )
            }
        })

    }
    const statusLabel = (status: any) => {
        switch (status) {
            case 0:
                return <span className='badge bg-secondary'>قيد الانتظار...</span>

            case 1:
                return <span className='badge bg-info text-dark'>قيد التنفيذ...</span>

            case 2:
                return <span className='badge bg-danger'>ملغية</span>

            case 3:
                return <span className='badge bg-success'>مكتملة</span>

            default:
                return <span className='badge bg-info text-dark'>قيد الانتظار...</span>
        }
    }
    return (
        <>
            <MetaTags
                title={'مشترياتي - تيموورك'}
                metaDescription={'مشترياتي - تيموورك'}
                ogDescription={'مشترياتي - تيموورك'}
            />
            <div className="timwoork-single">
                <div className="row py-4 justify-content-center">
                    <div className="col-lg-10">
                        <div className="app-bill">
                            <div className="app-bill-header">
                                <h3 className="title">مشترياتي</h3>
                            </div>
                            <div className="timlands-table">

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>العنوان</th>
                                            <th>السعر الكلي</th>
                                            <th>البائع</th>
                                            <th>التاريخ</th>
                                            <th>الأدوات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buysList && buysList.data.data.map((e: any) => (
                                            <tr key={e.id}>
                                                <td>
                                                    <Link href={`/mypurchases/${e.id}`}>
                                                        <a className='text-dark'>
                                                            {statusLabel(e.status)} {e.title}
                                                        </a>
                                                    </Link>
                                                </td>
                                                <td>{e.price_product}$</td>
                                                <td>
                                                    <p className="m-0">
                                                        <Link href={`/u/${e.profile_seller.profile.user.username}`}>
                                                            <a className='flex-center' style={{ color: "gray" }}>
                                                                <span className='mx-1'>{e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name}</span>
                                                            </a>
                                                        </Link>
                                                    </p>
                                                </td>
                                                <td>
                                                    <LastSeen date={e.created_at} />
                                                </td>
                                                <td>
                                                    {e.status == 0 &&
                                                        <Tooltip title="إلغاء الشراء">
                                                            <Button disabled={rejectLoading} onClick={() => rejectHandle(e.id)} danger type="primary" color='red' size="small" >إلغاء الشراء</Button>
                                                        </Tooltip>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {!buysList && <Loading />}
                                {BuysError && <Alert type='error'>للأسف لم يتم جلب البيانات</Alert>}
                                <div className="p-2 d-flex">
                                    <button className='btn butt-sm butt-primary me-auto' onClick={() => setPageIndex(pageIndex + 1)}>الصفحة التالية</button>
                                    <button className='btn butt-sm butt-primary' onClick={() => setPageIndex(pageIndex - 1)}>الصفحة السابقة</button>
                                </div>
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
