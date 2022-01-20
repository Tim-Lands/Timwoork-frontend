import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import useSWR from 'swr'
import Loading from '@/components/Loading'
function index() {
    const { data: subCategories }: any = useSWR(`dashboard/categories`)
    return (
        <div className="row py-4 justify-content-center">
            <div className="col-md-9">
                <div className="app-bill">
                    <div className="app-bill-header">
                        <h3 className="title">
                            صفحة التصنيفات
                        </h3>
                    </div>
                    <div className="app-bill-content">
                        {!subCategories && <Loading />}
                        <div className="row">
                            <div className="col-md-3">

                            </div>
                        </div>
                    </div>
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