import React from 'react'
import Link from 'next/link'

function CategoriesFooter() {
    return (
        <div className="app-footer-aside">
        <div className="aside-header">
            <h4 className="title">التصنيفات</h4>
        </div>
        <div className="aside-body">
            <ul className="aside-list-items">
                <li>
                    <Link href="">
                        <a>التصميم الغرافيكي</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>الحركات والفيديو</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>تقنيات وبرمجة</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>كتابة وترجمة</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>نمط الحياة</a>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default CategoriesFooter
