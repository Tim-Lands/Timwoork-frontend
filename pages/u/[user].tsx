
import React, { createRef, ReactElement, useEffect, useState } from "react";
import Image from 'next/image'
import Layout from '@/components/Layout/HomeLayout'
import { Badge, Card } from "antd";
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR from 'swr'
import PropTypes from "prop-types";
import Loading from '@/components/Loading'
import API from '../../config'
import Post from "@/components/Post/Post";

const User = ({ query, stars }) => {
    // Return statement.
    const { data: userInfo }: any = useSWR(`api/profiles/${query.user}`)
    const User = userInfo && userInfo.data
    const APIURL = ''
    const myLoader = () => {
        return `${APIURL}${User.profile.avatar_path}`;
    }

    const [isLess, setIsLess] = useState(true)
    const [isOverflow, setIsOverflow] = useState(false);
    const detectHeight: any = createRef()

    useEffect(()=>setIsOverflow(detectHeight&&detectHeight.current&&detectHeight.current.scrollHeight>230),[detectHeight,detectHeight.current])

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
                    <div className="timlands-profile-content py-3">
                        <div className="profile-content-header py-4">
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
                            {User && User.profile.profile_seller && User.profile.profile_seller.portfolio &&
                                <p className="py-3">
                                    <a rel="noreferrer" target="_blank" className="btn butt-sm butt-primary2" href={`${User.profile.profile_seller.portfolio}`}>مشاهدة رابط الأعمال</a>
                                </p>
                            }
                        </div>
                    </div>
                    <div className={'row justify-content-md-center'}>
                        <div className="col-lg-8">
                            <div className="timlands-profile-content">
                                {User && User.profile.profile_seller && User.profile.profile_seller.bio &&
                                    <div className="pb-1 mb-2">
                                        <Card title="نبذة عني">
                                            <div ref={detectHeight} className={'user-bro ' + (isLess ? 'is-less' : '')} dangerouslySetInnerHTML={{ __html: User && User.profile.profile_seller.bio }} />
                                            {isOverflow&&<button onClick={() => {console.log(detectHeight.current.scrollHeight);setIsLess(!isLess)}} type='button' className={'read-more-btn ' + (isLess ? 'is-less' : '')}>
                                                {isLess ? 'قراءة المزيد...' : 'قراءة أقل...'}
                                            </button>}
                                        </Card>
                                    </div>
                                }
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
                                        <div className="col-sm-6">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الاسم الأول</h3>
                                                <p className="text-value">{User.profile && User.profile.first_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="content-text-item">
                                                <h3 className="text-label">الاسم الأخير</h3>
                                                <p className="text-value">{User.profile && User.profile.last_name}</p>
                                            </div>
                                        </div>
                                        {User && User.profile.country !== null &&
                                            <div className="col-sm-6">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">البلد</h3>
                                                    <p className="text-value">{User.profile.country.name_ar}</p>
                                                </div>
                                            </div>
                                        }
                                        <div className="col-sm-6">
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
                                        {/* <div className="col-sm-4">
                                            <div className="content-text-item">
                                                <h3 className="text-label">تاريخ الميلاد</h3>
                                                <p className="text-value">{User.profile && User.profile.date_of_birth == null ? '' : userInfo.data.profile && userInfo.data.profile.date_of_birth}</p>
                                            </div>
                                        </div> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="posts-aside-header" style={{
                        textAlign: 'center',
                        paddingBlock: 10
                    }}>
                        <h1 className="title me-auto" style={{ fontWeight: 'bold', fontSize: 26 }}>الخدمات</h1>
                    </div>
                    <div className="posts-aside-body">
                        <div className="row">
                            {User && User.profile.profile_seller&&User.profile.profile_seller.products && User.profile.profile_seller.products.map((e: any) => (
                                <div key={e.id} className={"col-sm-6 col-lg-3"}>
                                    <Post
                                        size="small2"
                                        title={e.title}
                                        author={e.profile_seller && (e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name)}
                                        rate={e.ratings_avg_rating}
                                        username={e.profile_seller && e.profile_seller.profile.user.username}
                                        price={e.price}
                                        slug={e.slug}
                                        thumbnail={e.full_path_thumbnail}
                                        buyers={e.count_buying}
                                    />
                                </div>
                            ))}
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
