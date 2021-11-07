import Layout from '../../components/Layout/HomeLayout'
import { ReactElement } from "react";

function index() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    svsdfvww wefiwuy
                </div>
            </div>
        </div>
    )
}
index.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index
