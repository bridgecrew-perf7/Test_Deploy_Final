import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
import { Article } from '@app/core/constants/entity/Article';
import { PostService } from '@app/core/services/post.service';
import TagsList from '@app/shared/components/tags/TagsList';
import LikePost from '@app/pages/post/components/LikePost';

const UserArticleItem = (props: {
  article: Article;
  isReaction: boolean;
  section?: string;
}) => {
  const { article } = props;
  const postService = new PostService();
  const authState = useSelector((state: any) => state.authReducer);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecyclebin, setIsRecyclebin] = useState(
    props.section === 'Recyclebin' ? true : false
  );
  const [hasError, setHasError] = useState(false);
  const updateUrl = `/post/update-post/${article.id}`;

  const removeArticle = () => {
    setIsLoading(true);
    setHasError(false);
    (async () => {
      try {
        const response: any = await postService.deletePost(article.id);
        setIsDeleted(response);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    })();
  };

  const restorePost = () => {
    setIsLoading(true);
    setHasError(false);
    (async () => {
      try {
        const response: any = await postService.restoreDeletedPost(article.id);
        setIsRestored(response);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    })();
  };

  if (isDeleted || isRestored) {
    return <></>;
  }

  return (
    <div className="article-card user-article-card">
      <div className="article-header">
        <Link
          to={`/post/${!props.isReaction ? 'update-post/' : ''}${article.id}`}
        >
          <img
            src={article.cover || '/assets/images/default_cover.jpg'}
            alt={article.title}
            className={`article-img ${isRecyclebin ? 'disableLink' : ''}`}
          />
        </Link>
      </div>
      <div className="article-body">
        <div className="article-tag">
          <TagsList tagsList={article.tags} />
        </div>
        <Link
          to={`/post/${!props.isReaction ? 'update-post/' : ''}${article.id}`}
          className={`article-title-text ${isRecyclebin ? 'disableLink' : ''}`}
        >
          {article.title}
        </Link>
        <p className="article-content">{article.description}</p>
        <div className="article-footer">
          <div className="article-reaction">
            {props.isReaction && (
              <>
                <LikePost postDetail={article} isUserArticle={true} />
                <HashLink to={`/post/${article.id}#comment`}>
                  <img
                    className="article-reaction-icon"
                    src="../../../../assets/icons/comment-outline.svg"
                    alt="Comments"
                  />
                </HashLink>
                <span className="article-reaction-text">
                  {article.comments}
                </span>
              </>
            )}
          </div>
          {authState.data?.userInfo.id === article?.userId && (
            <div className="article-actions">
              {!isRecyclebin && (
                <Link className="btn btn-update" to={updateUrl}>
                  Update
                </Link>
              )}
              {!isLoading && (
                <>
                  <button
                    className="btn btn-delete"
                    onClick={isRecyclebin ? restorePost : removeArticle}
                  >
                    {isRecyclebin ? 'Restore' : 'Delete'}
                  </button>
                </>
              )}
              {isLoading && (
                <button className="btn btn-delete" disabled>
                  {isRecyclebin ? 'Restoring' : 'Deleting'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserArticleItem;
