import React from 'react'
import Link from 'next/link'

function CategoriesFooter() {
    return (
        <div className="app-footer-aside">
        <div className="aside-header">
            <h4 className="title">Categories</h4>
        </div>
        <div className="aside-body">
            <ul className="aside-list-items">
                <li>
                    <Link href="">
                        <a>Graphics & Design</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>Video & Animation</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>Programming & Tech</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>Writing & Translation</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>Writing & Translation</a>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default CategoriesFooter
