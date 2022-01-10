import Layout from '@/components/Layout/HomeLayout'
import Loading from '@/components/Loading';
import Notification from '@/components/Notification'
import { ReactElement, useEffect } from "react";
import useSWR from 'swr';
import Cookies from 'js-cookie'
import router from 'next/router';

import API from '../../config'
function index() {
    const token = Cookies.get('token')

    const { data: userInfo }: any = useSWR(`api/notifications`)
    //const notifications = userInfo && userInfo.user_details.unread_notifications
    async function markAllRead() {
        try {
            await API.post(`api/notifications/markAllAsRead`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log('error');
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        markAllRead()
    }, [])
    return (
        <div>ekhfgekfhegkhf</div>
    )
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
