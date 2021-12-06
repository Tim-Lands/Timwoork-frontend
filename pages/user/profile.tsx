import Layout from '@/components/Layout/HomeLayout'
import { Badge, Statistic, Card, Result } from 'antd'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import { ArrowUpOutlined, ArrowDownOutlined, ShrinkOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import withAuth from '../../services/withAuth'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'

function Profile() {
    const { data: userInfo }: any = useSWR('api/me')
    { !userInfo && <Loading /> }
    if (userInfo && userInfo.user_details.profile.steps <= 1)
        return <div className="row justify-content-md-center">
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
        </div>
    return (
        <div className="py-3">
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
                                {userInfo.user_details.profile.profile_seller &&
                                    <div className="py-1">
                                        <Card title="نبذة عني">
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
                                                value={112893}
                                                precision={2}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<ArrowDownOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد القابل للسحب"
                                                value={112893}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد الكلي"
                                                value={112893}
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
                                        <Badge count="غير متصل" offset={[10, 10]} >
                                            <div className="profile-content-avatar">
                                                <img src={'https://api.timwoork.com/avatars/' + userInfo.user_details.profile.avatar} width={120} />
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
                                                <Link href="">
                                                    <a className="btn butt-primary flex-center butt-sm">
                                                        <span className="material-icons material-icons-outlined">edit</span> تعديل الملف الشخصي
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
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">البلد</h3>
                                                    <p className="text-value">الجزائر</p>
                                                </div>
                                            </div>

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
                                                    <p className="text-value">{userInfo.user_details.profile.gender == null ? '' : userInfo.user_details.profile.gender}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">تاريخ الميلاد</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.date_of_birth == null ? '' : userInfo.user_details.profile.date_of_birth}</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="content-title">
                                            <div className="d-flex">
                                                <h3 className="title flex-center">
                                                    <span className="material-icons material-icons-outlined">account_circle</span>
                                                    المعلومات التقنية
                                                </h3>
                                            </div>
                                        </div>
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

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

Profile.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default connect(mapStateToProps)(withAuth(Profile));