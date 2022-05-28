import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PropTypes from "prop-types";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReplyContactModal from "@/components/ReplyContactModal";
import LastSeen from "@/components/LastSeen";

function Id({ query }): ReactElement {
    const { data: postsList }: any = useSWR(`dashboard/contacts/${query.id}`)
    const [isShowReplyModal, setIsShowReplyModal] = useState(false)
    return (
        <>
            {isShowReplyModal && <ReplyContactModal setIsConfirmText={setIsShowReplyModal} handleFunc={() => console.log('test')} title='الرد على الرسالة' />}
            <div className="timlands-panel">
                {!postsList && <Loading />}
                <div className="timlands-panel-header">
                    <h2 className="title">{postsList && postsList.data.subject}</h2>
                    <div className="header-butt">
                        <button className="btn butt-sm butt-primary me-auto" onClick={() => setIsShowReplyModal(true)}>الرد على الرسالة</button>
                    </div>
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
                                <th>رقم الهاتف</th>
                                <td>في انتظارها من الباكأند</td>
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
                <div className="justify-content-md-center">
                    <div className="timlands-panel-header">
                        <h2 className="title">الردود</h2>
                    </div>
                    <div className="timlands-panel-item p-2">
                        <div className="panel-item-body">
                            <h1 className="title" style={{ fontSize: 18 }}>
                                aboumegouass@gmail.com
                            </h1>
                            <p className="meta" style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#777', fontWeight: 200 }}>
                                <span className="material-icons material-icons-outlined ml-1" style={{ fontSize: 15 }}>
                                    schedule
                                </span>
                                <LastSeen date={'2022-03-13T13:12:06.000000Z'} />
                            </p>
                            <p className="text" style={{ margin: 0, fontSize: 14, lineHeight: 1.9, fontWeight: 200 }}>
                                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                                إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى
                            </p>
                        </div>
                        <div className="panel-item-footer d-flex">
                            <div className="absolute-btns">
                                <button className="btn butt-xs butt-blue">مشاهدة التفاصيل</button>
                            </div>
                        </div>
                    </div>
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
