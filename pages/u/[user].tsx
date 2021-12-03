
import React, { ReactElement } from "react";
import Link from 'next/link'
import Layout from '@/components/Layout/HomeLayout'
import { Badge, Card } from "antd";
import "antd/dist/antd.min.css";
import useSWR from 'swr'

const User = ({ query }) => {
    // Return statement.
    const { data: userInfo, error }: any = useSWR(`api/profiles/${query.user}`)
    //const userInfo = userInf.data
    return (
        <div className="py-3">
            {userInfo && userInfo.profile &&
                (<div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            {userInfo.profile.profile_seller &&
                                <>
                                    <div className="py-1">
                                        <Card title="نبذة عني">
                                            <p className="user-bro">
                                                {userInfo.profile.profile_seller.bio}
                                            </p>
                                        </Card>
                                    </div>
                                    <div className="py-1">
                                        <Card title="المهارات">
                                            {userInfo.profile.profile_seller &&
                                                <div className="content-text-item">
                                                    <h3 className="text-label">المهارات</h3>
                                                    {userInfo.profile.profile_seller.skills &&
                                                        <ul className="text-skills">
                                                            {userInfo.profile.profile_seller.skills.map((e, i) => (
                                                                <li key={i}>
                                                                    <Link href="">
                                                                        <a>{e.name_ar}</a>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                            }
                                        </Card>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="col-lg-8">
                            <div className="timlands-profile-content">
                                <div className="profile-content-header">
                                    <Badge count="غير متصل" offset={[10, 10]} >
                                        <div className="profile-content-avatar">
                                            {userInfo.profile &&
                                                <img src={'https://api.timwoork.com/avatars/' + userInfo.profile.avatar} width={120} />
                                            }
                                        </div>
                                    </Badge>
                                    <div className="profile-content-head">
                                        <h4 className="title">
                                            {userInfo.profile && userInfo.profile.first_name + ' ' +
                                                userInfo.profile && userInfo.profile.last_name}
                                        </h4>
                                        <p className="text">
                                            @{userInfo.username} |
                                            <span className="app-label"> المستوى الأول </span>
                                            <Badge
                                                className="site-badge-count-109"
                                                count="بائع محترف"
                                                style={{ backgroundColor: '#52c41a' }}
                                            />
                                        </p>
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
                                                <p className="text-value">{userInfo.profile && userInfo.profile.first_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الاسم الأخير</h3>
                                                <p className="text-value">{userInfo.profile && userInfo.profile.last_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">البلد</h3>
                                                <p className="text-value">الجزائر</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الجنس</h3>
                                                <p className="text-value">{userInfo.profile && userInfo.profile.gender == null ? '' : userInfo.profile && userInfo.profile.gender}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">تاريخ الميلاد</h3>
                                                <p className="text-value">{userInfo.profile && userInfo.profile.date_of_birth == null ? '' : userInfo.profile && userInfo.profile.date_of_birth}</p>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default User;
User.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
User.getInitialProps = async ({ query }) => {
    return { query }
  }