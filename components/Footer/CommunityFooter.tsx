import React from 'react'
import Link from 'next/link'

function CommunityFooter() {
    return (
        <div className="app-footer-aside">
            <div className="aside-header">
                <h4 className="title">مجتمع تيموورك</h4>
            </div>
            <div className="aside-body">
                <ul className="aside-list-items">
                    <li>
                        <Link href="">
                            <a>هذا النص هو مثال لنص يمكن أن يستبدل</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>في نفس المساحة، لقد تم توليد هذا النص من مولد النص</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>العديد من النصوص الأخرى إضافة إلى زيادة </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>عدد الحروف التى يولدها التطبيق. عدد الحروف التى يولدها </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>ومن هنا وجب على المصمم أن يضع نصوصا</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CommunityFooter
