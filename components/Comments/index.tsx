import CommentPost from "./CommentPost";
import PropTypes from "prop-types";

function index({ comments, canReply }) {
  return (
    <div className="timwoork-single-comments">
      <div className="timwoork-single-comments-inner">
        <div className="single-comments-body">
          <div className="comments-list-items">
            <ul className="list-items-ul">
              {comments.map((e: any) => (
                <CommentPost
                  key={e.id}
                  avatar={e.user.profile.avatar_path}
                  rating={e.rating}
                  replies={e.reply}
                  reply={e.reply}
                  time={e.created_at}
                  author={
                    e.user.profile.first_name + " " + e.user.profile.last_name
                  }
                  content={e.comment}
                  canReply={canReply}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
index.propTypes = {
  comments: PropTypes.array,
};
