import React from 'react';
import Link from 'next/link'
import { Badge, Skeleton } from 'antd';
import useSWR from 'swr'
import PropTypes from "prop-types";

function Sidebar({ RouterId }) {
    const { data: conversationsList }: any = useSWR(`api/conversations`)
    return (
        <div className='conversations-sidebar'>
            <div className="conversations-items">
                {!conversationsList &&
                    <div className="conversations-items-loading">
                        <div className="items-loading-skeleton" style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6 }}>
                            <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
                        </div>
                        <div className="items-loading-skeleton" style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6 }}>
                            <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
                        </div>
                        <div className="items-loading-skeleton" style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6 }}>
                            <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
                        </div>
                        <div className="items-loading-skeleton" style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6 }}>
                            <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
                        </div>
                        <div className="items-loading-skeleton" style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6 }}>
                            <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
                        </div>
                        <div className="items-loading-skeleton" style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6 }}>
                            <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
                        </div>
                        <div className="items-loading-skeleton" style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6 }}>
                            <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
                        </div>
                    </div>
                }
                <div className="conversations-item-head">
                    <h3 className="title">
                        جميع المحادثات
                    </h3>
                </div>
                <ul className="conversations-items-list">
                    {conversationsList && conversationsList.data.data.map((item: any) => (
                        <li className={(item.messages_count !== 0 && 'is-readed ') + (RouterId == item.id && ' active') } key={item.id}>
                            <Link href={`/conversations/${item.id}#msg-item-${item.latest_message.id}`}>
                                <a>
                                    <div className="conv-item-inner">
                                        <div className="conv-item-head">
                                            <img width={50} height={50} src={item.members[0].profile.avatar_path} alt="Abdelhamid Boumegouas" />
                                        </div>
                                        <div className="conv-item-body">
                                            <h3 className="user-title">
                                                {item.members[0].profile.full_name}
                                            </h3>
                                            <p className="conv-text">
                                                {item.latest_message.message}
                                            </p>
                                        </div>
                                        {item.messages_count !== 0 &&
                                            <Badge className='msg-count' count={item.messages_count} />
                                        }
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </div >
    )
}

export default Sidebar;
Sidebar.propTypes = {
    RouterId: PropTypes.any,
};