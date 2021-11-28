import Layout from '@/components/Layout/HomeLayout'
import { Badge, Statistic, Card } from 'antd'
import React, { ReactElement, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpOutlined, ArrowDownOutlined, ShrinkOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { logout, loadUser } from "./../../store/auth/authActions";
import withAuth from '../../services/withAuth'

function Profile(props: any) {
    useEffect(() => {
        props.loadUser()
    }, [])
    return (
        <div className="py-3">
            {props.userInfo && props.userInfo.profile &&
                (<div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            {props.userInfo.profile.profile_seller &&
                                <div className="py-1">
                                    <Card title="نبذة عني">
                                        <p className="user-bro">
                                            {props.userInfo.profile.profile_seller.bio}
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
                                            <img src={'https://api.timwoork.com/avatars/' + props.userInfo.profile.avatar} width={120} />
                                        </div>
                                    </Badge>
                                    <div className="profile-content-head">
                                        <h4 className="title">{props.userInfo.profile.first_name + ' ' + props.userInfo.profile.last_name}</h4>
                                        <p className="text">
                                            @{props.userInfo.username} |
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
                                                <p className="text-value">{props.userInfo.profile.first_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الاسم الأخير</h3>
                                                <p className="text-value">{props.userInfo.profile.last_name}</p>
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
                                                    <p className="text-value">{props.userInfo.phone}</p>
                                                </div>
                                            </Badge.Ribbon>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الجنس</h3>
                                                <p className="text-value">{props.userInfo.profile.gender == null ? '' : props.userInfo.profile.gender}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">تاريخ الميلاد</h3>
                                                <p className="text-value">{props.userInfo.profile.date_of_birth == null ? '' : props.userInfo.profile.date_of_birth}</p>

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
                                        {props.userInfo.profile.profile_seller &&
                                            <div className="col-sm-6">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">المهارات</h3>
                                                    {props.userInfo.profile.profile_seller.skills &&
                                                        <ul className="text-skills">
                                                            {props.userInfo.profile.profile_seller.skills.map((e, i) => (
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
                </div>)
            }
        </div>
    )
}
Profile.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.user
});

export default connect(mapStateToProps, { logout, loadUser })(withAuth(Profile));