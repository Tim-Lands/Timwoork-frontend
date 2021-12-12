
import React, { ReactElement } from "react";
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout/HomeLayout'
import { Badge, Card } from "antd";
import "antd/dist/antd.min.css";
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR from 'swr'
import PropTypes from "prop-types";
import Loading from '@/components/Loading'
import NotFound from "@/components/NotFound";

const User = ({ query }) => {
    // Return statement.
    const { data: userInfo, error }: any = useSWR(`api/profiles/${query.user}`)
    const User = userInfo && userInfo.data
    const APIURL = 'https://www.api.timwoork.com/avatars/'
    const myLoader = () => {
        return `${APIURL}${User.profile.avatar}`;
    }
    if (error) return <NotFound />
    return (
        <div className="py-3">
            {!userInfo && <Loading />}
            {userInfo && User.profile && <>
                <MetaTags
                    title={User.profile && User.profile.first_name + ' ' + User.profile && User.profile.last_name}
                    metaDescription={User.profile.profile_seller && User.profile.profile_seller.bio}
                    ogDescription={User.profile.profile_seller && User.profile.profile_seller.bio}
                />
                <div className="container">
                    <div className={"row" + (!User.profile.profile_seller && ' justify-content-md-center')}>
                        {User.profile.profile_seller &&
                            <div className="col-lg-4">
                                <div className="py-1">
                                    <Card title="نبذة عني">
                                        <p className="user-bro">
                                            {User.profile.profile_seller.bio}
                                        </p>
                                    </Card>
                                </div>
                                <div className="py-1">
                                    <Card title="المهارات">
                                        {User.profile.profile_seller &&
                                            <div className="content-text-item">
                                                <h3 className="text-label">المهارات</h3>
                                                {User.profile.profile_seller.skills &&
                                                    <ul className="text-skills">
                                                        {User.profile.profile_seller.skills.map((e: any, i) => (
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
                            </div>
                        }
                        <div className="col-lg-8">
                            <div className="timlands-profile-content">
                                <div className="profile-content-header">
                                    <Badge count="غير متصل" offset={[10, 10]} >
                                        <div className="profile-content-avatar">
                                            {User.profile.avatar == 'avatar.png' ?
                                                <Image src="/avatar2.jpg" width={120} height={120} /> :
                                                <Image
                                                    loader={myLoader}
                                                    src={APIURL + User.profile.avatar}
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
                                            {User.profile && User.profile.first_name + ' ' +
                                                User.profile && User.profile.last_name}
                                        </h4>
                                        <p className="text">
                                            @{User.username} |
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
                                                <p className="text-value">{User.profile && User.profile.first_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الاسم الأخير</h3>
                                                <p className="text-value">{User.profile && User.profile.last_name}</p>
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
                                                <p className="text-value">{User.profile && User.profile.gender == null ? '' : userInfo.data.profile && userInfo.data.profile.gender}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">تاريخ الميلاد</h3>
                                                <p className="text-value">{User.profile && User.profile.date_of_birth == null ? '' : userInfo.data.profile && userInfo.data.profile.date_of_birth}</p>

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
    );
};

export default User;
User.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
User.getInitialProps = async ({ query }) => {
    return { query }
}
User.propTypes = {
    query: PropTypes.any,
};