import Layout from '../../components/Layout/HomeLayout'
import { ReactElement } from "react";
//import { Alert } from "@/components/Alert/Alert";
function index() {
    return (
        <div className="container">
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>إدارة الخدمات</h2>
                </div>
                <div className="timlands-table">
                    gfhf hffhggf
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
