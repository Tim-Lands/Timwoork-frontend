import Layout from '@/components/Layout/HomeLayout'
import { Badge, Result } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';
import router from 'next/router'
import MyProducts from '@/components/Profile/MyProducts'

function index() {
    let token = Cookies.get('token')
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem('token');
    const [statusType, setStatusType] = useState('')
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])

    const { data: userInfo }: any = useSWR('api/me')
    const { data: postsList }: any = useSWR(`api/my_products${statusType}`)
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at
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
        return `${userInfo.user_details.profile.avatar_path}`;
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
                                        {userInfo.user_details.profile.avatar_path == 'avatar.png' ?
                                            <Image src="/avatar2.jpg" width={120} height={120} /> :
                                            <Image
                                                loader={myLoader}
                                                src={userInfo.user_details.profile.avatar_path}
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
                                        <span className="app-label"><span className="material-icons material-icons-outlined">badge</span> {userInfo.user_details.profile && userInfo.user_details.profile.profile_seller.level.name_ar} </span>
                                    </p>
                                </div>
                            </div>
                            {veriedEmail && <MyProducts
                                setStatusType={setStatusType}
                                postsList={postsList}
                            />}

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