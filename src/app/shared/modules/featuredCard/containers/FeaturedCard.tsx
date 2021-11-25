import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@app/core/constants/entity/Article';
import { formatDate } from '@app/shared/helpers/formatDate';
import TagsList from '@app/shared/components/tags/TagsList';

const FeaturedCard = (props: { item: Article }) => {
  const { ...article } = props.item;
  return (
    <div className="article-card featured-card">
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
        <p className="article-datetime">posted on {formatDate(article.createdAt)}</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
