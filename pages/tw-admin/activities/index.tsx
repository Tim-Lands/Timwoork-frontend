import { ReactElement, useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import API from '../../../config'
import Cookies from "js-cookie";
import Pagination from "react-js-pagination";

const extractTextFromActivity = (activity) => {
    switch (activity.type) {
        case 'order':
            return `${activity.title} عنوان الخدمة  ${activity.content.title}`;
        case 'rating':
            return `قام ${activity.user_sender.full_name} بتقييم  خدمة ${activity.content.slug.split('-').slice(1).join('')}`
        default:
            return activity.title
    }
}
function index() {

    const [pageNumber, setPagenNumber]: any = useState(1)
    const [activities, setActivities]: any = useState({ data: [], last_page: 1, per_page: 12 })
    const token = useRef(Cookies.get('token_dash'))

    useEffect(() => {
        fetchData()
    }, [pageNumber])
    const fetchData = async () => {
        try {
            const params = {
                page:pageNumber
            }
            const data = await API.get(`dashboard/activities/get_all_notifications`, {
                params,
                headers: {
                    Authorization: `Bearer ${token.current} `
                }
            })
            console.log(data)
            setActivities({ ...activities, last_page: data.data.data.last_page, per_page: data.data.data.per_page, data: data.data.data.data.map(not => JSON.parse(not.data)) })


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
                        <div className="activities-items">
                            <ul className="activities-items-list">
                                {activities?.data?.map(activity => (
                                    <li key={activity.id}>
                                        <span className="item-link">
                                            <div className="activity-item-img">
                                                <Image src={'/avatar.png'} width={50} height={50} />
                                            </div>
                                            <div className="activity-item">
                                                <p>{extractTextFromActivity(activity)}</p>
                                                <span className="meta">
                                                    <span className="material-icons material-icons-outlined">schedule</span>
                                                    <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
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
