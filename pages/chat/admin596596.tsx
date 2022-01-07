import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
import  SupportAdmin from '@/components/SupportChat/SupportAdmin'
import NoSsr from '@material-ui/core/NoSsr/NoSsr';


function Admin() {
    return (
        <>
        <NoSsr>
             <SupportAdmin />
        </NoSsr>
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
