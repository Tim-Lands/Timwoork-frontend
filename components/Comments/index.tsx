import CommentPost from './CommentPost'
import PropTypes from "prop-types";
function index({ comments }) {
    return (
        <div className="comments-list-items">
            <ul className="list-items-ul">
                {comments.map((e: any) => (
                    <CommentPost
                        key={e.id}
                        avatar={e.user.profile.avatar}
                        rating={e.rating}
                        replies={e.reply}
                        time={e.created_at}
                        author={e.user.profile.first_name + " " + e.user.profile.last_name}
                        content={e.comment} />
                ))}
            </ul>
        </div>
    )
}

export default index
index.propTypes = {
    comments: PropTypes.array,
};