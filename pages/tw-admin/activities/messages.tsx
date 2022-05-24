import { ReactElement, useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import Pagination from "react-js-pagination";
import API from '../../../config'
import Cookies from "js-cookie";

function index() {
    const [messages, setMessages] = useState({ last_page: 1, per_page: 12, data: [] })
    const [pageNumber, setPageNumber] = useState(1)
    const token = useRef(Cookies.get('token_dash'))
    useEffect(() => {
        fetchData()
    }, [pageNumber])
    const fetchData = async () => {
        try {
            const params ={
                page:pageNumber
            }
            const res = await API.get(`dashboard/activities/get_all_conversations`, {
                params,
                headers: {
                    Authorization: `Bearer ${token.current}`
                }
            })
            setMessages({ ...messages, per_page: res?.data?.data?.per_page, last_page: res?.data?.data?.last_page, data: res?.data?.data?.data })

            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title">
                        <span className="material-icons material-icons-outlined">
                            event_repeat
                        </span>
                        رسائل البائعين والمشتريين
                    </h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="activities-items">
                            <ul className="activities-items-list">
                                {messages?.data?.map(message => (
                                    <li key={message.id}>
                                        <span className="item-link">
                                            <div className="activity-item-img">
                                                <Image src={'/avatar.png'} width={50} height={50} />
                                            </div>
                                            <div className="activity-item">
                                                <span className="text">أرسل </span>
                                                <a href={`/u/${message.members[0].id}`} rel="noreferrer" target="_blank" className="u">{message.members[0].username}</a>
                                                <span className="text">رسالة خاصة لـ </span>
                                                <a href={`/u/${message.members[1].id}`} rel="noreferrer" target="_blank" className="u">{message.members[1].username}</a>
                                                <Link href={`/tw-admin/activities/conversation/${message.id}`}>
                                                    <a className="msg"> بشأن خدمة {message.title}</a>
                                                </Link>
                                                <span className="meta">
                                                    <span className="material-icons material-icons-outlined">schedule</span>
                                                    <LastSeen date={message.created_at} />
                                                </span>
                                            </div>
                                        </span>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                    <div>
                        <hr />
                        <Pagination
                            activePage={
                                pageNumber
                            }
                            itemsCountPerPage={
                                messages.per_page || 0
                            }
                            totalItemsCount={messages?.per_page * messages?.last_page}
                            onChange={(pageNumber) => {
                                setPageNumber(pageNumber);
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
        </>
    );
}
index.getLayout = function getLayout(page: any): ReactElement {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
