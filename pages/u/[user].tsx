
import React, { ReactElement } from "react";
import Image from 'next/image'
import Layout from '@/components/Layout/HomeLayout'
import { Badge, Card } from "antd";
import "antd/dist/antd.min.css";
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR from 'swr'
import PropTypes from "prop-types";
import Loading from '@/components/Loading'
import API from '../../config'

const User = ({ query, stars }) => {
    // Return statement.
    const { data: userInfo }: any = useSWR(`api/profiles/${query.user}`)
    const User = userInfo && userInfo.data
    const APIURL = ''
    const myLoader = () => {
        return `${APIURL}${User.profile.avatar_path}`;
    }
    return (
        <div className="py-3 mt-3">
            <MetaTags
                title={stars.data.profile.full_name}
                metaDescription={stars.data.profile.profile_seller && stars.data.profile.profile_seller.bio}
                ogDescription={stars.data.profile.profile_seller && stars.data.profile.profile_seller.bio}
                ogImage={stars.data.profile.avatar_path}
                ogUrl={`https://timwoork.com/u/${stars.data.username}`}
            />
            {!userInfo && <Loading />}
            {userInfo && User.profile && <>
                <div className="container">
                    <div className={'row justify-content-md-center'}>
                        {User.profile.profile_seller &&
                            <div className="col-lg-4">
                                <div className="py-1 mt-2">
                                    <Card title="نبذة عن البائع">
                                        <p className="user-bro">
                                            {User.profile.profile_seller.bio}
                                        </p>
                                    </Card>
                                </div>
                            </div>
                        }
                        <div className="col-lg-8">
                            <div className="timlands-profile-content">
                                <div className="profile-content-header">
                                    <Badge color={User.status == 0 ? '#ccc' : 'green'} count={User.status == 0 ? "غير متصل" : "متصل"} offset={[10, 10]} >
                                        <div className="profile-content-avatar">
                                            {User.profile.avatar_path == 'avatar.png' ?
                                                <Image src="/avatar2.jpg" width={120} height={120} /> :
                                                <Image
                                                    loader={myLoader}
                                                    src={APIURL + User.profile.avatar_path}
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
                                            {User.profile && User.profile.full_name}
                                        </h4>
                                        <p className="text">
                                            @{User.username} |
                                            <span className="app-label"> {User && User.profile && User.profile.level && User.profile.level.name_ar} </span>
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
                                        {User && User.profile.country !== null &&
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">البلد</h3>
                                                    <p className="text-value">{User.profile.country.name_ar}</p>
                                                </div>
                                            </div>
                                        }
                                        <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الجنس</h3>
                                                <p className="text-value">
                                                    {
                                                        User.profile && User.profile.gender == null ? '' :
                                                            User.profile && (User.profile.gender == 0 ? 'أنثى' : 'ذكر')
                                                    }
                                                </p>
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
export async function getServerSideProps({ query }) {
    try {
        const uriString = encodeURI(`api/profiles/${query.user}`)
        // Fetch data from external API
        const res = await API.get(uriString)

        // Pass data to the page via props
        return { props: { stars: res.data, query, errorFetch: false } }

    } catch (error) {
        return { props: { stars: null, query, errorFetch: true } }
    }
}
User.propTypes = {
    query: PropTypes.any,
    stars: PropTypes.any,
};