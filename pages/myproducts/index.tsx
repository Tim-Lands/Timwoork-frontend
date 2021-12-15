import Layout from '@/components/Layout/HomeLayout'
import { Badge, Result } from 'antd'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';
import Post from '@/components/Post/Post'

function index() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
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
    const APIURL = 'https://www.api.timwoork.com/avatars/'
    const myLoader = () => {
        return `${APIURL}${userInfo.user_details.profile.avatar}`;
    }
    return (
        <div className="py-3">
            {!userInfo && <Loading />}
            {!token && <Unauthorized />}
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={userInfo.user_details.profile.first_name + " " + userInfo.user_details.profile.last_name}
                        metaDescription={"الصفحة الرئيسية"}
                        ogDescription={"الصفحة الرئيسية"}
                    />
                    <div className="container">
                        <div className="timlands-profile-content">
                            <div className="profile-content-header">
                                <Badge count="غير متصل" offset={[10, 10]} >
                                    <div className="profile-content-avatar">
                                        {userInfo.user_details.profile.avatar == 'avatar.png' ?
                                            <Image src="/avatar2.jpg" width={120} height={120} /> :
                                            <Image
                                                loader={myLoader}
                                                src={APIURL + userInfo.user_details.profile.avatar}
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
                                    <h4 className="title">{userInfo.user_details.profile.first_name + ' ' + userInfo.user_details.profile.last_name}</h4>
                                    <p className="text">
                                        @{userInfo.user_details.username} |
                                        <span className="app-label"> المستوى الأول </span>
                                        <Badge
                                            className="site-badge-count-109"
                                            count="بائع محترف"
                                            style={{ backgroundColor: '#52c41a' }}
                                        />
                                    </p>
                                    <div className="button-edit">
                                        <Link href="/user/personalInformations">
                                            <a className="btn butt-primary flex-center butt-sm">
                                                <span className="material-icons material-icons-outlined">edit</span> تعديل الملف الشخصي
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-content-body">
                                <div className="page-header">
                                    <h3 className="title">خدماتي</h3>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-sm-6">
                                        
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