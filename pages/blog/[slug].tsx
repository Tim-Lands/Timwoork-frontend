
import React, { ReactElement, useState } from "react";
import Layout from '@/components/Layout/HomeLayout'
import "antd/dist/antd.min.css";
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR, { mutate } from 'swr'
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import Post from '@/components/Post/blogPost';
import { Divider } from 'antd';
import { Image } from 'antd';

const User = ({ query }) => {
    const { data: getPosts }: any = useSWR(`https://www.icoursat.com/blog-timwoork-com/wp-json/wp/v2/posts/?slug=${query.slug}`)
    const { data: getSamePosts }: any = useSWR(`https://www.icoursat.com/blog-timwoork-com/wp-json/wp/v2/posts?categories=${getPosts && getPosts[0].categories[0]}&per_page=3`)
    const { data: getAds }: any = useSWR(`https://www.icoursat.com/blog-timwoork-com/wp-json/wp/v2/media?include=28,29`)
    return (
        <>
            { !getPosts && <Loading /> }
            { getPosts && 
                <>
                    <MetaTags
                    title={getPosts[0].title.rendered}
                    metaDescription={getPosts[0].yoast_head_json.description}
                    ogDescription={getPosts[0].yoast_head_json.description} />

                    <article className="py-5">
                        <div className="container">
                            <header>
                                <div className="row" style={{ alignItems: 'center' }}>
                                    <div className="col-10">
                                        <h1 className="mb-0" style={{ fontSize: '2em' }}>{getPosts[0].title.rendered}</h1>
                                    </div>
                                    <div className="col-2">
                                        <span>نُشرت في</span>
                                        <span style={{ display: 'inline-block', marginInlineStart: '.5rem' }}>{rtlDateFormatted(getPosts[0].modified)}</span>
                                    </div>
                                </div>
                            </header>
                            <Divider />
                            <div className="row">
                                <div className="col-md-8">
                                    <Image
                                        src={getPosts[0].jetpack_featured_media_url}
                                    />
                                    <div className="mt-3" style={{ lineHeight: '2' }} dangerouslySetInnerHTML={{__html: getPosts[0].content.rendered}}></div>
                                    <Divider />
                                    <h3>مقالات ذات صلة:</h3>
                                    { !getSamePosts && <Loading /> }
                                    <div className="row">
                                        { getSamePosts && getSamePosts.map((item : any) => (
                                            <div className="col-md-4" key={item.id}>
                                                <Post 
                                                    title={item.title.rendered.length > 22 ? item.title.rendered.substring(0, 22) + '...' : item.title.rendered}
                                                    thumbnail={item.jetpack_featured_media_url}
                                                    size={'small'}
                                                    slug={item.slug}
                                                    excerpt={item.excerpt.rendered.substring(0, 100) + '...'}
                                                />
                                            </div>
                                        )) }
                                    </div>
                                    { getSamePosts && getSamePosts.length == 0 && 
                                        <p>لا يوجد مقالات ذات صلة الآن.</p>
                                    } 
                                </div>

                                <div className="col-md-4">
                                    { !getAds && <Loading /> }
                                    { getAds && getAds.map((item : any) => (
                                        <div key={item.id}>
                                            <Image
                                                src={item.link}
                                            />
                                        </div>
                                    )) }

                                </div>
                            </div>

                        </div>
                    </article>
                </>
            } 
            
        </>
    )
};

function ltrDateFormatted (theDate) {
    let date = new Date(theDate)
    return `${date.getDate() < 9 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`
}

function rtlDateFormatted (theDate) {
    return theDate.split('T')[0]
}

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