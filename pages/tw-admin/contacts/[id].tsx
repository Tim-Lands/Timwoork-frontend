import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PropTypes from "prop-types";
import useSWR from "swr";
import Loading from "@/components/Loading";

function Id({ query }): ReactElement {
    const { data: postsList }: any = useSWR(`dashboard/contacts/${query.id}`)

    return (
        <>
            <div className="timlands-panel">
                {!postsList && <Loading />}
                <div className="timlands-panel-header">
                    <h2 className="title">{postsList && postsList.data.subject}</h2>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <tbody>
                             <tr>
                                <th>تاريخ الرسالة</th>
                                <td>{postsList && postsList.data.created_at}</td>
                            </tr>
                            <tr>
                                <th>صاحب الرسالة</th>
                                <td>{postsList && postsList.data.full_name}</td>
                            </tr>
                            <tr>
                                <th>البريد الإلكتروني</th>
                                <td>{postsList && postsList.data.email}</td>
                            </tr>
                            <tr>
                                <th>موقع الأيبي</th>
                                <td>{postsList && postsList.data.ip_client}</td>
                            </tr>
                            <tr>
                                <th>عنوان الرسالة</th>
                                <td>{postsList && postsList.data.subject}</td>
                            </tr>
                            <tr>
                                <th>وقت الرسالة</th>
                                <td>{postsList && postsList.data.email}</td>
                            </tr>
                            <tr>
                                <th>نوع الرسالة</th>
                                <td>{(postsList && postsList.data.type_message == 0) ? 'استفسار' : 'شكوى'}</td>
                            </tr>
                            <tr>
                                <th>رابط الرسالة</th>
                                <td>{postsList && postsList.data.url}</td>
                            </tr>
                            <tr>
                                <th>نص الرسالة</th>
                                <td>{postsList && postsList.data.message}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}
Id.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export async function getServerSideProps({ query }) {
    return { props: { query } }
}
Id.propTypes = {
    query: PropTypes.any,
};
export default Id;
