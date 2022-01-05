import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'
function index() {
    return (
        <div className="row py-4 justify-content-center">
            <div className="col-md-7">
                <div className="app-bill">
                    <div className="app-bill-header">
                        <h3 className="title">الفاتورة النهائية</h3>
                    </div>
                    <div className="app-bill-content">
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                عدد الخدمات
                                <span className="">vfv</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                السعر الكلي
                                <span className="">fgvfg$</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                سعر التحويل
                                <span className="">fgvfg</span>
                            </li>
                            <li className="list-group-item total d-flex justify-content-between align-items-center">
                                المجموع الكلي
                                <span className="">fgvfgrv</span>
                            </li>
                        </ul>
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
