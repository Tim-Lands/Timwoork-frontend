import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
import { MetaTags } from '@/components/SEO/MetaTags'
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import router from 'next/router'

function Home() {

    return (
        <>
            <MetaTags
                title={"مجتمع تيموورك "}
            />
            <Result
                icon={<SmileOutlined />}
                title="سيتم انطلاق مجتمع تيموورك قريبا"
                extra={<button onClick={() => router.push('/')} className='btn butt-sm butt-primary'>العودة للرئيسية</button>}
            />
        </>
    );
}
Home.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Home