import React, { ReactElement, useState } from 'react'
import PropTypes from 'prop-types'
import DashboardLayout from '@/components/Layout/DashboardLayout';
import LastSeen from '@/components/LastSeen';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmText from '@/components/ConfirmText';

function Single({ query }: any) {
    const [isConfirmText, setIsConfirmText] = useState(false)
    async function deleteMsg() {
        console.log('test');
    }
    return (
        <div className="timlands-panel">
            {isConfirmText && <ConfirmText setIsConfirmText={setIsConfirmText} text='هل تريد حقا حذف هذه الرسالة؟' handleFunc={deleteMsg} />}
            <div className="timlands-panel-header" title={query.id}>
                <h2 className="title">
                    <span className="material-icons material-icons-outlined">
                        event_repeat
                    </span>
                    محادثة بين <a href="" rel="noreferrer" target="_blank">عبد الحميد بومقواس</a> و <a href="" rel="noreferrer" target="_blank">طارق عروي</a>
                </h2>
            </div>
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <div className="conversation-items">
                        <ul className="conversation-items-list">
                            <li>
                                <span className="item-link user-from">
                                    <div className="item-actions d-flex">
                                        <button className='btn-item'>
                                            <span className="material-icons material-icons-outlined">edit</span>
                                        </button>
                                        <button className='btn-item del' onClick={() => setIsConfirmText(true)}>
                                            <span className="material-icons material-icons-outlined">close</span>
                                        </button>
                                    </div>
                                    <div className="conversation-item-img">
                                        <Image src={'/avatar.png'} width={50} height={50} />
                                    </div>
                                    <div className="conversation-item">
                                        <p className="username">
                                            <Link href={`/u/${122}`}>
                                                <a>
                                                    عبد الحميد بومقواس
                                                </a>
                                            </Link>
                                        </p>
                                        <span className="meta">
                                            <span className="material-icons material-icons-outlined">schedule</span>
                                            <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                        </span>
                                        <p className='text'>
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى
                                        </p>
                                    </div>
                                </span>
                            </li>
                            <li>
                                <span className="item-link user-to">
                                    <div className="item-actions d-flex">
                                        <button className='btn-item' onClick={() => setIsConfirmText(true)}>
                                            <span className="material-icons material-icons-outlined">close</span>
                                        </button>
                                        <button className='btn-item'>
                                            <span className="material-icons material-icons-outlined">edit</span>
                                        </button>
                                    </div>
                                    <div className="conversation-item-img">
                                        <Image src={'/avatar.png'} width={50} height={50} />
                                    </div>
                                    <div className="conversation-item">
                                        <p className="username">
                                            <Link href={`/u/${122}`}>
                                                <a>
                                                    عبد الحميد بومقواس
                                                </a>
                                            </Link>
                                        </p>
                                        <span className="meta">
                                            <span className="material-icons material-icons-outlined">schedule</span>
                                            <LastSeen date={'2022-03-07T23:42:20.000000Z'} />
                                        </span>
                                        <p className='text'>
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى
                                        </p>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Single;
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
Single.getLayout = function getLayout(page: any): ReactElement {
    return <DashboardLayout>{page}</DashboardLayout>;
};
Single.propTypes = {
    query: PropTypes.any,
};

