import React from 'react';
import CommentPost from '@core/constants/entity/CommentPost';
import CommentCard from './CommentCard';

interface commentListProps {
  data: CommentPost[];
}

const CommentList = (props: commentListProps) => {
  return (
    <ul className="comment-list">
      {props.data?.map((comment: CommentPost) => {
        return (
          <li className="comment-item" key={comment.id}>
            <CommentCard data={comment} />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
