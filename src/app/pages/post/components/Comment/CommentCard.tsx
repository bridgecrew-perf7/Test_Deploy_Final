import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import CommentPost from '@app/core/constants/entity/CommentPost';
import { formatDate } from '@app/shared/helpers/formatDate';
interface commentCardProps {
  data: CommentPost;
}
const CommentCard = (props: commentCardProps) => {
  const { data } = props;
  return (
    <div className="comment py-4">
      <div className="comment-info mb-1">
        <Link to={`/profile/${data.user.id}`} className="comment-author">
          <img
            src={
              data.user.picture ||
              '../../../../../assets/images/default-user-picture.jpeg'
            }
            alt={data.user.displayName}
            className="author-img"
          />
        </Link>
        <div className="comment-info-detail">
          <Link to={`/profile/${data.user.id}`} className="comment-author-name">
            {`${data.user.firstName} ${data.user.lastName}`}
          </Link>
          <p className="comment-datetime">
            commented on {formatDate(data.createdAt)}
          </p>
        </div>
      </div>
      <div className="comment-content">
        {ReactHtmlParser(props.data.comment)}
      </div>
    </div>
  );
};

export default CommentCard;
