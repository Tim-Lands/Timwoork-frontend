import { ReactElement, useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import API from '../../../config'
import Cookies from "js-cookie";

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
    const [activities, setActivities]: any = useState({ data: [], last_page: 1 })
    const token = useRef(Cookies.get('token_dash'))

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const data = await API.get(`dashboard/activities/get_all_notifications?page = 3`, {
                headers: {
                    Authorization: `Bearer ${token.current} `
                }
            })
            setActivities({ ...activities, data: data.data.data.data.map(not => JSON.parse(not.data)) })


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
                                    <li>
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
                                <li>
                                    <span className="item-link">
                                        <div className="activity-item-img">
                                            <Image src={'/avatar.png'} width={50} height={50} />
                                        </div>
                                        <div className="activity-item">
                                            <span className="text">قام </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">عبد الحميد بومقواس</a>
                                            <span className="text">بتقييم خدمة </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">شرف الدين</a>
                                            <a href="" rel="noreferrer" target="_blank" className="text">&25B6; ترجمة مقال يتكون من 19 كلمة بسعر خيالي</a>
                                            <span className="meta">
                                                <span className="material-icons material-icons-outlined">schedule</span>
                                                <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                            </span>
                                        </div>
                                    </span>
                                </li>
                                <li>
                                    <span className="item-link">
                                        <div className="activity-item-img">
                                            <Image src={'/avatar.png'} width={50} height={50} />
                                        </div>
                                        <div className="activity-item">
                                            <span className="text">قام </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">عبد الحميد بومقواس</a>
                                            <span className="text">بتصميم صفحة النشاطات لـ </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">شرف الدين</a>
                                            <span className="meta">
                                                <span className="material-icons material-icons-outlined">schedule</span>
                                                <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                            </span>
                                        </div>
                                    </span>
                                </li>
                                <li>
                                    <span className="item-link">
                                        <div className="activity-item-img">
                                            <Image src={'/avatar.png'} width={50} height={50} />
                                        </div>
                                        <div className="activity-item">
                                            <span className="text">أرسل </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">عبد الحميد بومقواس</a>
                                            <span className="text">رسالة خاصة لـ </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">شرف الدين</a>
                                            <a href="" rel="noreferrer" target="_blank" className="msg"> ترجمة مقال يتكون من 19 كلمة بسعر خيالي</a>
                                            <span className="meta">
                                                <span className="material-icons material-icons-outlined">schedule</span>
                                                <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                            </span>
                                        </div>
                                    </span>
                                </li>
                                <li>
                                    <span className="item-link">
                                        <div className="activity-item-img">
                                            <Image src={'/avatar.png'} width={50} height={50} />
                                        </div>
                                        <div className="activity-item">
                                            <span className="text">قام </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">عبد الحميد بومقواس</a>
                                            <span className="text">بتقييم خدمة </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">شرف الدين</a>
                                            <a href="" rel="noreferrer" target="_blank" className="text">&25B6; ترجمة مقال يتكون من 19 كلمة بسعر خيالي</a>
                                            <span className="meta">
                                                <span className="material-icons material-icons-outlined">schedule</span>
                                                <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                            </span>
                                        </div>
                                    </span>
                                </li>
                                <li>
                                    <span className="item-link">
                                        <div className="activity-item-img">
                                            <Image src={'/avatar.png'} width={50} height={50} />
                                        </div>
                                        <div className="activity-item">
                                            <span className="text">قام </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">عبد الحميد بومقواس</a>
                                            <span className="text">بتصميم صفحة النشاطات لـ </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">شرف الدين</a>
                                            <span className="meta">
                                                <span className="material-icons material-icons-outlined">schedule</span>
                                                <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                            </span>
                                        </div>
                                    </span>
                                </li>
                                <li>
                                    <span className="item-link">
                                        <div className="activity-item-img">
                                            <Image src={'/avatar.png'} width={50} height={50} />
                                        </div>
                                        <div className="activity-item">
                                            <span className="text">أرسل </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">عبد الحميد بومقواس</a>
                                            <span className="text">رسالة خاصة لـ </span>
                                            <a href="" rel="noreferrer" target="_blank" className="u">شرف الدين</a>
                                            <a href="" rel="noreferrer" target="_blank" className="msg"> ترجمة مقال يتكون من 19 كلمة بسعر خيالي</a>
                                            <span className="meta">
                                                <span className="material-icons material-icons-outlined">schedule</span>
                                                <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                            </span>
                                        </div>
                                    </span>
                                </li>
                            </ul>
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
