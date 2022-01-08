import Layout from '@/components/Layout/HomeLayout'
import Loading from '@/components/Loading';
import Notification from '@/components/Notification'
import { ReactElement } from "react";
import useSWR from 'swr';

function index() {
    const { data: userInfo }: any = useSWR(`api/me`)
    const notifications = userInfo && userInfo.user_details.unread_notifications
    return (
        <div className="my-2 py-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="app-bill">
                        <div className="app-bill-header">
                            <h3 className="title">الإشعارات</h3>
                        </div>
                        {!notifications && <Loading />}
                        <div className="notifications-panel">
                            <div className="list-group">
                                {notifications && notifications.map((e: any) => (
                                    <Notification
                                        key={e.id}
                                        title={e.data.title}
                                        avatar={e.data.user.profile.avatar}
                                        created_at={e.created_at}
                                        product_title={e.data.item.title}
                                    />
                                ))}
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
