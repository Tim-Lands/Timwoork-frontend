import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";

function index() {

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
                                            <Link href={`/tw-admin/activities/conversation/${2}`}>
                                                <a className="msg"> ترجمة مقال يتكون من 19 كلمة بسعر خيالي</a>
                                            </Link>
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
