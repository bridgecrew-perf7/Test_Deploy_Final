import React, { useContext, useEffect, useState } from 'react';
import { PostService } from '@app/core/services/post.service';
import { ReactionService } from '@app/core/services/reaction.service';
import Modal from '@app/shared/components/modal/Modal';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import { useSelector } from 'react-redux';
import ListUsersLiked from './ListUsersLiked';

const reactionService = new ReactionService();
const postService = new PostService();

const LikePost = (props: { postDetail; isUserArticle? }) => {
  const { postDetail } = props;
  const authState = useSelector((state: any) => state.authReducer);
  const [isLogin, setIsLogin] = useState(authState.data ? true : false);
  const [post, setPost] = useState(null);

  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(+postDetail.likes);
  const [isLiked, setIsLiked] = useState(isLogin ? post?.isLiked : false);
  const { showNotification } = useContext(NotificationContext);

  const [isListUsersShow, setIsListUsersShow] = useState(false);
  const [usersLiked, setUsersLiked] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [hasError, setHasError] = useState(false);

  const showList = () => {
    setIsListUsersShow(true);
  };

  const handleLike = () => {
    if (!isLogin) {
      showNotification({
        isSuccess: false,
        message: 'Please Login First !',
      });
      return;
    }
    setIsLoadingLike(true);
    (async () => {
      try {
        setHasError(false);
        const res: any = await reactionService.likePost(postDetail.id);
        setIsLiked(res.liked);
        setLikeNumber((prevState) => (isLiked ? prevState - 1 : prevState + 1));
        setIsLoadingLike(false);
      } catch (error) {
        setHasError(true);
      }
    })();
  };

  useEffect(() => {
    setIsLogin(authState.data ? true : false);
    setIsLiked(authState.data ? postDetail.isLiked : false);
    setHasError(false);
    (async () => {
      try {
        const res: any = await postService.getPost(postDetail.id);
        setIsLiked(res?.isLiked);
        setPost(res);
      } catch (error) {
        setHasError(true);
      }
    })();
  }, [authState]);

  useEffect(() => {
    setIsLoadingList(true);
    setHasError(false);
    (async () => {
      try {
        const res = await reactionService.getListUserLiked(postDetail.id);
        setUsersLiked(res);
        setIsLoadingList(false);
      } catch (error) {
        setHasError(true);
      }
    })();
  }, [isListUsersShow]);

  return (
    <>
      <button
        className="btn btn-reaction"
        onClick={handleLike}
        disabled={isLoadingLike}
      >
        <img
          className={`${
            props.isUserArticle ? 'article-reaction-icon' : 'reaction-icon'
          }`}
          src={
            isLiked
              ? '../../../../assets/icons/like-solid.svg'
              : '../../../../assets/icons/like-outline.svg'
          }
          alt="Likes"
        />
      </button>
      <span
        className={`${
          props.isUserArticle ? 'article-reaction-text' : 'reaction-text'
        } reaction-text-like`}
        onClick={showList}
      >
        {likeNumber}
      </span>
      {isListUsersShow && (
        <Modal setShow={setIsListUsersShow} className="modal-liked-users">
          <ListUsersLiked list={usersLiked} isLoadingList={isLoadingList} />
        </Modal>
      )}
    </>
  );
};

export default LikePost;
