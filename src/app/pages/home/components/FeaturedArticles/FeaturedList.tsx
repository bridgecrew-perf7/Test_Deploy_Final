import React from 'react';
import ArticleCard from '@app/shared/modules/articleCard/containers/ArticleCard';
import FeaturedCard from '@app/shared/modules/featuredCard/containers/FeaturedCard';
import { Article } from '@app/core/constants/entity/Article';

const FeaturedList = (props: { featuredList: Article[] }) => {
  const { featuredList } = props;
  return (
    <div className="row">
      <ul className="col col-lg-6 col-md-12 col-sm-12">
        {featuredList.map(
          (item, index) =>
            index === 0 && (
              <li key={item.id}>
                <ArticleCard item={item} className="article-card" />
              </li>
            )
        )}
      </ul>
      <ul className="col col-lg-6 col-md-12 col-sm-12">
        {featuredList.map(
          (item, index) =>
            index !== 0 && (
              <li className="featured-card-right" key={item.id}>
                <FeaturedCard item={item} />
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default FeaturedList;
