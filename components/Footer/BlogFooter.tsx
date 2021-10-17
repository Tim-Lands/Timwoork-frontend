import React from 'react'
import Link from 'next/link'
function BlogFooter() {
    return (
        <div className="app-footer-aside">
        <div className="aside-header">
            <h4 className="title">Blog</h4>
        </div>
        <div className="aside-body">
            <ul className="aside-list-items">
                <li>
                    <Link href="">
                        <a>Sed ut perspiciatis unde omnis iste natus error</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>Nemo enim ipsam voluptatem quia voluptas sit</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>Ut enim ad minima veniam, quis nostrum exercitationem</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>Quis autem vel eum iure qui in ea velit esse</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>But I must explain to you how all this mistaken idea</a>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default BlogFooter
