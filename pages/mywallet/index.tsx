import Layout from '@/components/Layout/HomeLayout'
import { Badge } from 'antd'
import React, { ReactElement, useEffect } from 'react'
import Link from 'next/link'
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
                        title={'محفظتي - تيموورك'}
                        metaDescription={"الصفحة الرئيسية"}
                        ogDescription={"الصفحة الرئيسية"}
                    />
                    <div className="container">
                        <div className="row">
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
                                                <Badge
                                                    className="site-badge-count-109"
                                                    count={userInfo.user_details.profile.badge.name_ar}
                                                    style={{ backgroundColor: '#52c41a' }}
                                                />
                                            </p>
                                            <div className="button-edit">
                                                <Link href="/user/personalInformations">
                                                    <a className="btn butt-primary flex-center butt-sm">
                                                        <span className="material-icons material-icons-outlined">edit</span> تعديل الملف الشخصي
                                                    </a>
                                                </Link>
                                                <Link href="/user/changePass">
                                                    <a className="btn butt-primary2 flex-center butt-sm mt-1">
                                                        <span className="material-icons material-icons-outlined">lock</span> تغيير كلمة المرور
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-content-body">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">تاريخ الميلاد</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.date_of_birth == null ? '' : userInfo.user_details.profile.date_of_birth}</p>
                                                </div>
                                            </div>
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