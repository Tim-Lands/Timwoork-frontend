import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
import  SupportAdmin from '@/components/SupportChat/SupportAdmin'


function Admin() {
    return (
        <>
        <SupportAdmin />
        
        </>
    )
}
Admin.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Admin
