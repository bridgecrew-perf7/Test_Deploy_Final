import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { formatDate } from '@app/shared/helpers/formatDate';
import { PostService } from '@app/core/services/post.service';
import { UsersService } from '@app/core/services/users.service';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';
import TagsList from '@app/shared/components/tags/TagsList';
import PostContent from '../components/PostContent';
import Comment from '../components/Comment/Comment';
import LikePost from '../components/LikePost';
import FollowButton from '@app/shared/components/follow/FollowButton';
import BookmarkButton from '@app/shared/components/bookmark/BookmarkButton';

const PostDetail = () => {
  const { id } = useParams();
  const postService = new PostService();
  const usersService = new UsersService();
  const navigate = useNavigate();
  const accountReducer = useSelector((state: any) => state.accountReducer);
  const authReducer = useSelector((state: any) => state.authReducer);
  const [postDetail, setPostDetail] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const postResponse: any = await postService.getPost(id);
        setPostDetail(postResponse);
        if (authReducer.data) {
          const userResponse: any = await usersService.getUserInfo(
            postResponse.userId
          );
          setAuthorInfo({ id: postResponse.userId, ...userResponse });
        }
      } catch (error) {
        setHasError(error);
      }
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {postDetail?.status === 'draft' ? (
        <Navigate to={'/'} />
      ) : (
        postDetail && (
          <>
            <section className="post-detail my-10">
              <div className="container">
                <div className="post-header mb-10">
                  <div className="post-tag">
                    <TagsList tagsList={postDetail.tags} />
                  </div>
                  <h2 className="post-title mb-10 mt-4">{postDetail.title}</h2>
                  <div className="post-info mb-10">
                    <Link
                      to={`/profile/${postDetail.user.id}`}
                      className="post-author"
                    >
                      <img
                        src={
                          postDetail.user.picture ||
                          '/assets/images/default-user-picture.jpeg'
                        }
                        alt={postDetail.user.displayName}
                        className="author-img"
                      />
                    </Link>
                    <div className="post-info-detail">
                      <Link
                        to={`/profile/${postDetail.user.id}`}
                        className="post-author-name"
                      >
                        {`${postDetail.user.firstName} ${postDetail.user.lastName}`}
                      </Link>
                      <p className="post-datetime">
                        posted on {formatDate(postDetail.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="cover-img-container">
                    <img
                      className="cover-img"
                      src={postDetail.cover}
                      alt={postDetail.title}
                    />
                  </div>
                </div>
                <div className="post-main">
                  <PostContent content={postDetail.content} />
                </div>
                <div className="post-footer">
                  <div className="post-toolbar">
                    <div className="post-reaction">
                      <LikePost postDetail={postDetail} />
                      <label
                        htmlFor="comment-input"
                        className="btn btn-reaction"
                      >
                        <img
                          className="reaction-icon"
                          src="../../../../assets/icons/comment-outline.svg"
                          alt="Comments"
                        />
                      </label>
                      <span className="reaction-text">
                        {postDetail.comments}
                      </span>
                      <div className="post-bookmark">
                        {authReducer.data && (
                          <BookmarkButton
                            isInBookmark={postDetail.isInBookmark}
                            postId={postDetail.id}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="post-author-subcription">
                    <h4 className="mb-5">Written by</h4>
                    <div className="author-info">
                      <Link to={`/profile/${postDetail.user.id}`}>
                        <img
                          className="author-img"
                          src={
                            postDetail.user.picture ||
                            '/assets/images/default-user-picture.jpeg'
                          }
                          alt={postDetail.user.displayName}
                        />
                      </Link>
                      <div className="author-info-detail">
                        <Link to={`/profile/${postDetail.user.id}`}>
                          <h5 className="author-name">{`${postDetail.user.firstName} ${postDetail.user.lastName}`}</h5>
                        </Link>
                        <span className="author-display-name txt-primary">
                          {postDetail.user?.displayName
                            ? `@${postDetail.user?.displayName}`
                            : ''}
                        </span>
                      </div>
                      {authReducer.data &&
                        authorInfo?.id !== accountReducer.data?.id && (
                          <FollowButton
                            followingId={authorInfo.id}
                            isFollowed={authorInfo.isFollowed}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {postDetail.status !== 'draft' && (
              <section className="post-comment" id="comment">
                <Comment id={postDetail.id} />
              </section>
            )}
          </>
        )
      )}
    </>
  );
};

export default PostDetail;
