import Layout from '@/components/Layout/HomeLayout'
import Loading from '@/components/Loading';
import Notification from '@/components/Notification'
import { ReactElement, useEffect } from "react";
import useSWR from 'swr';
import Cookies from 'js-cookie'
import router from 'next/router';
import API from '../../config'
import { Result } from 'antd';
import { MetaTags } from '@/components/SEO/MetaTags';
function index() {
    const token = Cookies.get('token')
    const { data: notifications }: any = useSWR(`api/notifications`)
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
        <div className="my-2 py-4">
            <MetaTags
                title="الإشعارات"
                metaDescription="الإشعارات"
                ogDescription="الإشعارات"
            />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="app-bill">
                        <div className="app-bill-header">
                            <h3 className="title">الإشعارات</h3>
                        </div>
                        {!notifications && <Loading />}
                        {notifications && notifications.data.data.length == 0 && <Result
                            status="404"
                            title="لا يوجد لديك اشعارات"
                            subTitle="ليس لديك اشعارات لعرضها"
                        />}
                        <div className="notifications-panel">
                            <div className="list-group">
                                {notifications && notifications.data.data.map((e: any) => (
                                    <Notification
                                        key={e.id}
                                        title={e.data.title}
                                        type={e.data.type}
                                        item_id={e.data.content.item_id}
                                        to={e.data.to}
                                        avatar={e.data.user_sender.avatar_url}
                                        created_at={e.created_at}
                                        product_title={e.data.content.title}
                                        slug={e.data.content.slug}
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
