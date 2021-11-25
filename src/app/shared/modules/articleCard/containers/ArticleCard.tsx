import React from 'react';
import { Article } from '@app/core/constants/entity/Article';
import { Link } from 'react-router-dom';
import { formatDate } from '@app/shared/helpers/formatDate';
import TagsList from '@app/shared/components/tags/TagsList';

const ArticleCard = (props: { item: Article, className: string }) => {
  const { ...article } = props.item;
  return (
    <div className={props.className}>
      <div className="article-header">
        <Link to={`post/${article.id}`}>
          <img
            src={article.cover}
            alt={article.title}
            className="article-img"
          />
        </Link>
      </div>
      <div className="article-body">
        <div className="article-tag">
          <TagsList tagsList={article.tags} />
        </div>
        <Link to={`post/${article.id}`} className="article-title-text">
          {article.title}
        </Link>
        <p className="article-content">{article.description}</p>
      </div>
      <div className="article-footer">
        <Link to={`profile/${article.user.id}`} className="article-author">
          <img
            src={
              article.user.picture || '/assets/images/default-user-picture.jpeg'
            }
            alt={article.user.displayName}
            className="author-img"
          />
        </Link>
        <div className="article-info">
          <Link
            to={`profile/${article.user.id}`}
            className="article-author-name"
          >
            {article.user.displayName || article.user.firstName}
          </Link>
          <p className="article-datetime">posted on {formatDate(article.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
