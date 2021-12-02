import React, { ReactElement } from 'react'
import Link from 'next/link'
function Notification(): ReactElement {
    return (
        <Link href="#">
            <a className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <img src="/avatar3.jpg" alt="twbs" width="40" height="40" className="rounded-circle flex-shrink-0" />
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-2" >استفسار حول <strong>تصميم لوغو بواسطة برنامج Adobe Illustrator</strong></h6>
                        <p className="mb-0 opacity-75">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى.</p>
                    </div>
                    <small className="opacity-50 text-nowrap">منذ 5 دقائق</small>
                </div>
            </a>
        </Link>
    )
}

export default Notification
