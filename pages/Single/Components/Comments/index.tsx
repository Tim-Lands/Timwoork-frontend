import React from 'react'
import CommentPost from './CommentPost'
const replies = [
    {
        id: 1,
        autor: 'Buyer ben Buyer',
        time: '9 min ago',
        content: 'consectetur adipisicing elit. Aut dolore veritatis dolor, voluptas, corporis, repudiandae dolores neque in reprehenderit delectus nihil quod dolorum qui architecto'
    }
]
function index() {
    return (
        <div className="comments-list-items">
            <ul className="list-items-ul">
                <CommentPost time="4 min ago" author="Abdellah Elhadi" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolore veritatis dolor, voluptas, corporis, repudiandae dolores neque in reprehenderit delectus nihil quod dolorum qui architecto a facilis laborum voluptate possimus?" />
                <CommentPost replies={replies} time="8 days ago" author="Folan ben folan" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolore veritatis dolor, voluptas, corporis, repudiandae dolores neque in reprehenderit delectus nihil quod dolorum qui architecto a facilis laborum voluptate possimus?" />
            </ul>
        </div>
    )
}

export default index
