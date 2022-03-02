import Layout from '@/components/Layout/HomeLayout'
import React, { ReactElement, useEffect } from 'react'
import { MetaTags } from '@/components/SEO/MetaTags';
import Cookies from 'js-cookie'
import Sidebar from '@/components/Conversations/Sidebar';
import { Empty } from 'antd';
import router from 'next/router';
function index() {
    const token = Cookies.get('token')
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])
    return (
        <>
            <MetaTags
                title={'المحادثات'}
                metaDescription={'مبيعاتي - تيموورك'}
                ogDescription={'مبيعاتي - تيموورك'}
            />
            <div className="timwoork-single">
                <div className="row py-4 justify-content-center">
                    <div className="col-lg-11">
                        <div className="row">
                            <div className="col-lg-4">
                                <Sidebar />
                            </div>
                            <div className="col-lg-8">
                                <div className="conversations-form-main"
                                    style={{
                                        padding: 9,
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <div className="conversations-form">
                                        <Empty description={'اختر أحد المحادثات لعرض رسائلها'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index
