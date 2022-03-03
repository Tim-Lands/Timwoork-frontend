import Layout from '@/components/Layout/HomeLayout'
import React, { ReactElement, useEffect } from 'react'
import Image from 'next/image'
import router from 'next/router'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';

function index() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
    const myLoader = () => {
        return `${userInfo.user_details.profile.avatar_url}`;
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])
    return (
        <div className="py-3">
            {!userInfo && <Loading />}
            {!token && <Unauthorized />}
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={'محفظتي'}
                        metaDescription={"الصفحة الرئيسية"}
                        ogDescription={"الصفحة الرئيسية"}
                    />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="timlands-profile-content">
                                    <div className="profile-content-header">
                                        <div className="profile-content-avatar">
                                            <Image
                                                loader={myLoader}
                                                src={userInfo && userInfo.user_details.profile.avatar_url}
                                                quality={1}
                                                width={120}
                                                height={120}
                                                placeholder='blur'
                                                blurDataURL='/avatar2.jpg'
                                            />
                                        </div>
                                        <div className="profile-content-head">
                                            <h4 className="title">
                                                {userInfo.user_details.profile.full_name}
                                            </h4>
                                            <p className="text">
                                                @{userInfo.user_details.username} |
                                                <span className="app-label"> {userInfo.user_details.profile.level.name_ar} </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="profile-content-body">
                                        <div className="page-header xs">
                                            <h3 className='title'>محفظتي</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="content-text-item wallet-info red">
                                                    <h3 className="text-label">الرصيد المعلق</h3>
                                                    <p className="text-value">{userInfo && userInfo.user_details.profile.pending_amount}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item wallet-info green">
                                                    <h3 className="text-label">الرصيد القابل للسحب</h3>
                                                    <p className="text-value">{userInfo && userInfo.user_details.profile.withdrawable_amount}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item wallet-info ">
                                                    <h3 className="text-label">الرصيد الكلي</h3>
                                                    <p className="text-value">{Number(userInfo && userInfo.user_details.profile.withdrawable_amount) + Number(userInfo && userInfo.user_details.profile.pending_amount)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center py-4">
                                            <button type='button' className='btn butt-green butt-md px-5'>
                                                طلب سحب الأموال 
                                            </button>
                                        </div>
                                        <div className="page-header xs">
                                            <h3 className='title'>المعاملات المالية</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
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