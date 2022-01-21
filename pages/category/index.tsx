import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import useSWR from 'swr'
import Loading from '@/components/Loading'
import Link from 'next/link'
function index() {
    const { data: categories }: any = useSWR(`api/categories`)
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
                        {!categories && <Loading />}
                        <div className="row">
                            {categories && categories.data.map((e: any) => (
                                <div className="col-md-3" key={e.id}>
                                    <div className="category-item">
                                        <div className="category-item-title">
                                            <h3 className="title"><span className={"material-icons material-icons-outlined"}>{e.icon}</span> {e.name_ar}</h3>
                                        </div>
                                        <ul className="category-item-content">
                                            {e.subcategories && e.subcategories.map((item: any) => (
                                                <li key={item.id}>
                                                    <Link href={`/category/${item.id}`}>
                                                        {item.name_ar}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
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