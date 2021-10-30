import { ReactElement, useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import AddNewUser from "./Modals/AddNewUser";
import { Alert } from "../../../components/Alert/Alert";
function index(): ReactElement {

    const [isModalShowen, setIsModalShowen] = useState(false)
    const setIsModalHiddenHandle = () => {
        setIsModalShowen(false);
    }
    // Return statement.
    return (
        <>
            {isModalShowen && <AddNewUser setIsModalHiddenHandle={setIsModalHiddenHandle} />}
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">people</span>إدارة الأعضاء</h2>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>الاسم واللقب</th>
                                <th className="hidden-tem">اسم المستخدم</th>
                                <th>الولاية</th>
                                <th className="hidden-tem">الحالة</th>
                                <th className="hidden-tem">متصل</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                    </table>
                    <Alert type="warning">
                        <p className="text"><span className="material-icons">warning_amber</span> لاتوجد أعضاء</p>
                    </Alert>
                </div>
            </div>
        </>
    );
}

index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )

}
export default index;
