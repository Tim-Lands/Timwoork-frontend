import Layout from '@/components/Layout/HomeLayout'
import { Badge, Result } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import API from '../../config'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';
import MyPost from '@/components/Post/myPost'

function index() {
    const token = Cookies.get('token')
    //const [isLoading, setIsLoading] = useState(false)
    //const [isError, setIsError] = useState(false)
    const [postsList, setPostsList]: any = useState([])

    const getProducts = async () => {
        //setIsLoading(true)
        try {
            const res: any = await API.get(`api/my_products`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res) {
                //setIsLoading(false)
                setPostsList(res.data.data)
                console.log(postsList);

                //setIsError(false)
            }
        } catch (error) {
            //setIsError(true)
            //setIsLoading(false)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
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
    const myLoader = () => {
        return `${userInfo.user_details.profile.avatar}`;
    }
    return (
        <div className="py-3">
            {!postsList && <Loading />}
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
                                        <Link href="/user/changePass">
                                            <a className="btn butt-primary2 flex-center butt-sm mt-1">
                                                <span className="material-icons material-icons-outlined">lock</span> تغيير كلمة المرور
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-content-body">
                                <div className="page-header">
                                    <h3 className="title">خدماتي</h3>
                                </div>
                                {postsList.length == 0 &&
                                    <Result
                                        status="404"
                                        title="لا يوجد لديك خدمات"
                                        subTitle="يمكنك إضافة خدمة في أي وقت "
                                        extra={<Link href='/add-new'><a className="btn butt-sm butt-primary">إضافة خدمة جديدة</a></Link>}
                                    />
                                }
                                <div className="row">
                                    {postsList && postsList.map((e: any) => (
                                        <div className="col-lg-4 col-sm-6" key={e.id}>
                                            <MyPost
                                                size="small"
                                                title={e.title}
                                                rate={e.ratings_avg}
                                                price={e.price}
                                                slug={e.slug}
                                                thumbnail={e.thumbnail}
                                                buyers={e.count_buying}
                                            />
                                        </div>
                                    ))}
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