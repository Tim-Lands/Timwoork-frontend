import { ReactElement, useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import API from '../../../config'
import Cookies from "js-cookie";
import Pagination from "react-js-pagination";

const ActivityData = (activity) => {
    switch (activity.data.type) {
        case 'order':
            return <p> {activity.data.title} عنوان الخدمة  <a href={`/p/${activity.data.content.item_id}`}>{activity.data.content.title}</a> , مقدمة من <a href={`/u/${activity.user_id}`} target="_blank" rel="noreferrer"> {activity.username}</a></p>;
        case 'rating':
            return <p> قام <a href=""> {activity.data.user_sender.full_name}</a> بتقييم خدمة {activity.content.slug.split('-').slice(1).join('')} المُقدمة من <a href={`/u/${activity.user.user_id}`} target='_blank' rel="noreferrer">  {activity.user.username}</a></p>
        case 'system':
            return <p>إشعار من الإدارة إلى <a href={`/u/${activity.user_id}`}>{activity.username}</a> : <a href={``}>{activity.data.title}</a></p>
        default:
            return activity.data.title
    }
}
function index() {

    const [pageNumber, setPagenNumber]: any = useState(1)
    const [activities, setActivities]: any = useState({ data: [], last_page: 1, per_page: 12 })
    const token = useRef(Cookies.get('token_dash'))
    const [sentinel, setSentinel] = useState({ mount: true })
    const email = useRef(null)
    useEffect(() => {
        fetchData()
    }, [pageNumber, sentinel])
    const fetchData = async () => {
        try {
            const params = {
                page: pageNumber,
                email: email.current
            }
            const data = await API.get(`dashboard/activities/get_all_notifications`, {
                params,
                headers: {
                    Authorization: `Bearer ${token.current} `
                }
            })

            setActivities({
                ...activities, last_page: data.data.data.last_page, per_page: data.data.data.per_page, data: data.data.data.data.map(not => ({
                    data: JSON.parse(not.data),
                    email: not.email, created_at: not.created_at, user_id: not.user_id, username: not.username
                }))
            })


        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(activities)

    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title">
                        <span className="material-icons material-icons-outlined">
                            event_repeat
                        </span>
                        جميع النشاطات
                    </h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        {/* <div className="py-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="timlands-form">
                                        <input
                                            id="input-sQuery"
                                            name="sQuery"
                                            placeholder="إكتب بريد المُستخدم للبحث."
                                            className="timlands-inputs"
                                            onChange={(e) => email.current = (e.target.value)}
                                            onKeyDown={(e) => {
                                                email.current = e.target.value
                                                if (e.keyCode === 13)
                                                    setSentinel({ ...sentinel, mount: true })
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="activities-items">
                            <ul className="activities-items-list">
                                {activities?.data?.map(activity => (
                                    <li key={activity.id}>
                                        <span className="item-link">
                                            <div className="activity-item-img">
                                                <Image src={'/avatar.png'} width={50} height={50} />
                                            </div>
                                            <div className="activity-item">
                                                {ActivityData(activity)}
                                                <span className="meta">
                                                    <span className="material-icons material-icons-outlined">schedule</span>
                                                    <LastSeen date={activity.created_at} />
                                                </span>
                                            </div>
                                        </span>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div>
                            <hr />
                            <Pagination
                                activePage={
                                    pageNumber
                                }
                                itemsCountPerPage={
                                    activities.per_page || 0
                                }
                                totalItemsCount={activities?.per_page * activities?.last_page}
                                onChange={(pageNumber) => {
                                    setPagenNumber(pageNumber);
                                }}
                                pageRangeDisplayed={8}
                                itemClass="page-item"
                                linkClass="page-link"
                                className="productPagination"
                                firstPageText={"الصفحة الأولى"}
                                lastPageText={"الصفحة الأخيرة"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
index.getLayout = function getLayout(page: any): ReactElement {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
