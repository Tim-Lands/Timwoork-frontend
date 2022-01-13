import Layout from '@/components/Layout/HomeLayout'
import { Badge, Statistic, Card, Result, message } from 'antd'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { FallOutlined, RiseOutlined, ShrinkOutlined } from '@ant-design/icons';
import Image from 'next/image'
import router from 'next/router'
import API from '../../config'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';

function Profile() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
    if (userInfo && userInfo.user_details.profile.steps < 1)
        return (<div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="حسابك غير كامل"
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
    const [isLoadingSeler, setIsLoadingSeler] = useState(false)
    const beseller = async () => {
        setIsLoadingSeler(true)
        try {
            const res = await API.post("api/sellers/store", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                setIsLoadingSeler(false)
                router.push('/user/editSeller')
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع')
            setIsLoadingSeler(false)
        }
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
                        <div className="row">
                            <div className="col-lg-4">
                                {!userInfo.user_details.profile.profile_seller &&
                                    <div className="be-seller-aside">
                                        <h3 className="title">كن بائعا</h3>
                                        <p className="text">هل تريد أن تكون بائعا؟ يمكنك إضافة معلومات إضافية!</p>
                                        <button onClick={beseller} disabled={isLoadingSeler} className='btn butt-green butt-md' style={{ width: '100%' }}>
                                            إنشاء بروفايل بائع
                                        </button>
                                    </div>
                                }
                                {userInfo.user_details.profile.profile_seller &&
                                    <div className="py-1">
                                        <Card title="نبذة عني" extra={<Link href="/user/editSeller"><a className='edit-button flex-center'><span className="material-icons material-icons-outlined">edit</span></a></Link>}>
                                            <p className="user-bro">
                                                {userInfo.user_details.profile.profile_seller.bio}
                                            </p>
                                        </Card>
                                    </div>
                                }
                                <div className="py-1">
                                    <Card title="الرصيد">
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد المعلق"
                                                value={userInfo && userInfo.user_details.profile.pending_amount}
                                                precision={2}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<FallOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد القابل للسحب"
                                                value={userInfo && userInfo.user_details.profile.withdrawable_amount}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<RiseOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد الكلي"
                                                value={userInfo && (Number(userInfo.user_details.profile.withdrawable_amount) + Number(userInfo.user_details.profile.pending_amount))}
                                                precision={2}
                                                valueStyle={{ color: '#222' }}
                                                prefix={<ShrinkOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-lg-8">
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
                                        <div className="content-title">
                                            <div className="d-flex">
                                                <h3 className="title flex-center">
                                                    <span className="material-icons material-icons-outlined">account_circle</span>
                                                    المعلومات الشخصية
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الاسم الأول</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.first_name}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الاسم الأخير</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.last_name}</p>
                                                </div>
                                            </div>
                                            {userInfo.user_details.profile.country !== null &&
                                                <div className="col-sm-4">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">البلد</h3>
                                                        <p className="text-value">{userInfo.user_details.profile.country.name_ar}</p>
                                                    </div>
                                                </div>
                                            }

                                            <div className="col-sm-4">
                                                <Badge.Ribbon text="مفعل" color="green">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">رقم الهاتف</h3>
                                                        <p className="text-value">{userInfo.user_details.phone}</p>
                                                    </div>
                                                </Badge.Ribbon>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الجنس</h3>
                                                    <p className="text-value">
                                                        {
                                                            userInfo.user_details.profile && userInfo.user_details.profile.gender == null ? '' :
                                                                userInfo.user_details.profile && (userInfo.user_details.profile.gender == 0 ? 'أنثى' : 'ذكر')
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">تاريخ الميلاد</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.date_of_birth == null ? '' : userInfo.user_details.profile.date_of_birth}</p>

                                                </div>
                                            </div>
                                        </div>
                                        {userInfo.user_details.profile.profile_seller &&
                                            <div className="content-title">
                                                <div className="d-flex">
                                                    <h3 className="title flex-center me-auto">
                                                        <span className="material-icons material-icons-outlined">account_circle</span>
                                                        المعلومات التقنية
                                                    </h3>
                                                    <Link href="/user/editSeller">
                                                        <a className='edit-button flex-center ml-auto'>
                                                            <span className="material-icons material-icons-outlined">edit</span>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                        <div className="row">
                                            {userInfo.user_details.profile.profile_seller &&
                                                <div className="col-sm-6">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">المهارات</h3>
                                                        {userInfo.user_details.profile.profile_seller.skills &&
                                                            <ul className="text-skills">
                                                                {userInfo.user_details.profile.profile_seller.skills.map((e: any, i) => (
                                                                    <li key={i}>
                                                                        <Link href="">
                                                                            <a>{e.name_ar}</a>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            }
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

Profile.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Profile