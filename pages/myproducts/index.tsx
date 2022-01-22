import Layout from '@/components/Layout/HomeLayout'
import { Badge, message, notification, Result } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import API from '../../config'
import Link from 'next/link'
import Image from 'next/image'
import useSWR, { mutate } from 'swr'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { MetaTags } from '@/components/SEO/MetaTags'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';
import router from 'next/router'
import MyProducts from '@/components/Profile/MyProducts'

function index() {
    const token = Cookies.get('token')
    const [statusType, setStatusType] = useState('')
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])

    const { data: userInfo }: any = useSWR('api/me')
    const { data: postsList }: any = useSWR(`api/my_products${statusType}`)

    const deleteHandle = (id: any) => {
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await API.post(`api/product/${id}/deleteProduct`, null, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (res.status === 200) {
                        message.success('تم حذف هذه الخدمة')
                    }
                } catch (error) {
                    console.log(error);
                }
                swalWithBootstrapButtons.fire(
                    'تم الحذف!',
                    'لقد تم حذف هذا العنصر بنجاح',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
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

    const disactiveProductHandle = async (id: any) => {
        const MySwal = withReactContent(Swal)

        const swalWithBootstrapButtons = MySwal.mixin({
            customClass: {
                confirmButton: 'btn butt-red butt-sm me-1',
                cancelButton: 'btn butt-green butt-sm'
            },
            buttonsStyling: false
        })
        try {
            const res = await API.post(`api/my_products/${id}/disactive_product`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                swalWithBootstrapButtons.fire(
                    'تم التعطيل!',
                    'لقد تم تعطيل هذه الخدمة بنجاح',
                    'success'
                )
                mutate(`api/my_products${statusType}`)
            }
        } catch (error) {
            notification['error']({
                message: 'رسالة خطأ',
                description: 'للأسف لم يتم تعطيل هذه الخدمة',
            });
        }
    }
    if (userInfo && userInfo.user_details.profile.steps < 1)
        return (<div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    subTitle="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    extra={
                        <Link href="/user/personalInformations">
                            <a className="btn butt-primary butt-md">
                                الذهاب إلى التعديل
                            </a>
                        </Link>
                    }
                />
            </div>
        </div>)
    const myLoader = () => {
        return `${userInfo.user_details.profile.avatar}`;
    }
    return (
        <div className="py-3">
            {!token && <Unauthorized />}
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={'خدماتي'}
                        metaDescription={"الصفحة الرئيسية"}
                        ogDescription={"الصفحة الرئيسية"}
                    />
                    <div className="container">
                        <div className="timlands-profile-content">
                            <div className="profile-content-header">
                                <Badge color={'green'} count="متصل" offset={[10, 10]} >
                                    <div className="profile-content-avatar">
                                        {userInfo.user_details.profile.avatar == 'avatar.png' ?
                                            <Image src="/avatar2.jpg" width={120} height={120} /> :
                                            <Image
                                                loader={myLoader}
                                                src={userInfo.user_details.profile.avatar}
                                                quality={1}
                                                width={120}
                                                height={120}
                                                placeholder='blur'
                                                blurDataURL='/avatar2.jpg'
                                            />
                                        }
                                    </div>
                                </Badge>
                                <div className="profile-content-head">
                                    <h4 className="title">
                                        {userInfo.user_details.profile.first_name + ' ' + userInfo.user_details.profile.last_name}
                                    </h4>
                                    <p className="text">
                                        @{userInfo.user_details.username} |
                                        <span className="app-label"> {userInfo.user_details.profile && userInfo.user_details.profile.level.name_ar} </span>
                                        <Badge
                                            className="site-badge-count-109"
                                            count={userInfo.user_details.profile.badge.name_ar}
                                            style={{ backgroundColor: '#52c41a' }}
                                        />
                                    </p>
                                </div>
                            </div>
                            <MyProducts
                                setStatusType={setStatusType}
                                postsList={postsList}
                                disactivateHandle={disactiveProductHandle}
                                deleteHandle={deleteHandle}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index