import CommentPost from "./CommentPost";
import PropTypes from "prop-types";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
function index({ comments, canReply }) {
  const { language } = useContext(LanguageContext);

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
                  content={e[whichComment(language)]}
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
function whichComment(language) {
  switch (language) {
    default:
      return "comment_en";
    case "ar":
      return "comment_ar";
    case "en":
      return "comment_en";
    case "fr":
      return "comment_fr";
  }
}

export default index;
index.propTypes = {
  comments: PropTypes.array,
};
