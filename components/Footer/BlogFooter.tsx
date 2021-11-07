import React from 'react'
import Link from 'next/link'
function BlogFooter() {
    return (
        <div className="app-footer-aside">
        <div className="aside-header">
            <h4 className="title">المدونة</h4>
        </div>
        <div className="aside-body">
            <ul className="aside-list-items">
                <li>
                    <Link href="">
                        <a>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>لقد تم توليد هذا النص من مولد النص العربى</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>عدد الحروف التى يولدها التطبيق.إذا كنت تحتاج إلى عدد أكب</a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>من الفقرات يتيح لك مولد النص العربى زيادة</a>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default BlogFooter
