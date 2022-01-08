import React, { ReactElement } from 'react'
import Link from 'next/link'
import PropTypes from "prop-types";
import LastSeen from './LastSeen';

function Notification({ title, avatar, created_at, product_title }): ReactElement {
    return (
        <Link href="#">
            <a className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <img src={avatar} alt="twbs" width="40" height="40" className="rounded-circle flex-shrink-0" />
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-2" >{title}</h6>
                        <p className="mb-0 opacity-75">{product_title}</p>
                    </div>
                    <small className="opacity-50 text-nowrap"><LastSeen date={created_at} /></small>
                </div>
            </a>
        </Link>
    )
}

export default Notification
Notification.propTypes = {
    title: PropTypes.string,
    avatar: PropTypes.string,
    created_at: PropTypes.string,
    product_title: PropTypes.string
};