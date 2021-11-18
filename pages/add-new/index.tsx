import Layout from '../../components/Layout/HomeLayout'
import { ReactElement } from "react";
import router from 'next/router';

function index() {

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="timlands-add-new">
                        <div className="timlands-add-new-icon">
                            <span className="material-icons material-icons-outlined">add_circle_outline</span>
                        </div>
                        <div className="timlands-add-new-body">
                            <h3 className="title">إضافة خدمة جديدة</h3>
                            <p className="text">
                            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
                            </p>
                            <div className="add-butts">
                                <button type="button"className="btn butt-md butt-primary2" onClick={() => router.push('/add-new/overview')}>
                                    إضافة خدمة 
                                </button>
                            </div>
                        </div>
                    </div>
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
