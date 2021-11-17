import React from 'react'
import CommentPost from './CommentPost'
const replies = [
    {
        id: 1,
        autor: 'المشتري فلان',
        time: 'منذ 25 دقيقة',
        content: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه'
    }
]
function index() {
    return (
        <div className="comments-list-items">
            <ul className="list-items-ul">
                <CommentPost time="منذ 5 دقائق" author="عبدالله الهادي" content="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل " />
                <CommentPost replies={replies} time="منذ 9 ايام" author="فارس المتولي" content="ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى" />
            </ul>
        </div>
    )
}

export default index
