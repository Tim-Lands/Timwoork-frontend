import Layout from '@/components/Layout/HomeLayout'
import { Badge, Statistic, Card } from 'antd'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import { ArrowUpOutlined, ArrowDownOutlined, ShrinkOutlined } from '@ant-design/icons';

function Profile() {
    return (
        <div className="py-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="py-1">
                            <Card title="نبذة عني">
                                <p className="user-bro">
                                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك
                                </p>
                            </Card>
                        </div>
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
                                        <img src="/avatar2.jpg" width={120} />
                                    </div>
                                </Badge>
                                <div className="profile-content-head">
                                    <h4 className="title">عبد الحميد بومقواس</h4>
                                    <p className="text">
                                        @aboumegouass |
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
                                            <p className="text-value">عبد الحميد</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="content-text-item">
                                            <h3 className="text-label">الاسم الأخير</h3>
                                            <p className="text-value">بومقواس</p>
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
                                                <p className="text-value">+213558873988</p>
                                            </div>
                                        </Badge.Ribbon>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="content-text-item">
                                            <h3 className="text-label">الجنس</h3>
                                            <p className="text-value">ذكر</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="content-text-item">
                                            <h3 className="text-label">تاريخ الميلاد</h3>
                                            <p className="text-value">19 مارس 1989</p>

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
                                    <div className="col-sm-6">
                                        <div className="content-text-item">
                                            <h3 className="text-label">المهارات</h3>
                                            <ul className="text-skills">
                                                <li>
                                                    <Link href="">
                                                        <a>CSS</a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="">
                                                        <a>JavaScript</a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="">
                                                        <a>التصميم الغرافيكي</a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="">
                                                        <a>التدوين</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
export default Profile
