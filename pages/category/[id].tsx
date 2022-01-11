import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import PropTypes from "prop-types";
import useSWR from 'swr'
import { Result } from 'antd';
import Loading from '@/components/Loading';
import Post from '@/components/Post/Post';

function index({ query }) {
    const { data: popularProducts }: any = useSWR(`api/filter?paginate=12&category=${query.id}`)
    const { data: subCategories }: any = useSWR(`api/get_categories/${query.id}`)
    return (
        <div className="row py-4 justify-content-center">
            <div className="col-md-9">
                <div className="app-bill">
                    {subCategories &&
                        <div className="app-bill-header">
                            <h3 className="title">
                                <span className={"material-icons material-icons-outlined"}>{subCategories.data.icon}</span>
                               <span style={{ fontWeight: 200 }}> عرض خدمات التصنيف</span> <strong> {subCategories.data.name_ar} </strong>
                            </h3>
                        </div>
                    }
                    <div className="app-bill-content">
                        {!popularProducts && <Loading />}
                        {popularProducts && popularProducts.data.length == 0 &&
                            <Result
                                status="404"
                                title="لا توجد خدمات"
                                subTitle="لا توجد خدمات لعرضها في هذا الصنف"
                            />}
                        <div className="row">
                            {popularProducts && popularProducts.data.length !== 0 && popularProducts.data.data.map((e: any) => (
                                <div key={e.id} className={"col-md-4"}>
                                    <Post
                                        size="small"
                                        title={e.title}
                                        author={e.profile_seller && (e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name)}
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
                    {popularProducts && popularProducts.data.length !== 0 &&
                        <div className="load-more-div">
                            <button className='btn butt-lg butt-primary'>
                                <span className="text">تحميل المزيد...</span>
                            </button>
                        </div>}

                </div>
            </div>
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
index.propTypes = {
    query: PropTypes.any,
}
index.getInitialProps = ({ query }) => {
    return { query }
}