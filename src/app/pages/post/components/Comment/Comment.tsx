import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactionService } from '@app/core/services/reaction.service';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import CommentList from './CommentList';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';

const reactionService = new ReactionService();

interface commentProps {
  id: number;
}

const Comment = (props: commentProps) => {
  const { id } = props;
  const accountReducer = useSelector((state: any) => state.accountReducer);
  const [commentList, setCommentList] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await reactionService.getListUserCommented(id);
        setCommentList(res);
      } catch (error) {}
    })();
  }, []);
  const onComment = (data) => {
    (async () => {
      setIsProcessing(true);
      try {
        const res: any = await reactionService.commentPost(data, id);
        setCommentList([{ ...res, user: accountReducer.data }, ...commentList]);
        resetField('content');
      } catch (error) {
        showNotification({
          isSuccess: false,
          message: 'Comment unsuccessfully',
        });
      }
      setIsProcessing(false);
    })();
  };
  return (
    <div className="container">
      {accountReducer.data?.id ? (
        <form className="form comment-form" onSubmit={handleSubmit(onComment)}>
          <textarea
            rows={3}
            {...register('content', {
              required: 'You have not input anything',
            })}
            id="comment-input"
            placeholder="What do you think about the post ?"
            className={`form-control form-input ${
              errors.content ? 'invalid' : ''
            }`}
          />
          {errors.content && (
            <span className="form-error">{errors.content.message}</span>
          )}
          <LoadingButton loading={isProcessing} classBtn="btn btn-primary">
            Post
          </LoadingButton>
        </form>
      ) : (
        <p
          className={`txt-semi ${
            commentList?.length > 0 ? 'mb-10' : 'mb-2'
          }  txt-center`}
        >
          You have to login to post comment!
          <Link className="txt-primary" to={'/auth/login'}>
            &nbsp; Login Now
          </Link>
        </p>
      )}
      {commentList ? <CommentList data={commentList} /> : <LoadingSpinner />}
    </div>
  );
};

export default Comment;
