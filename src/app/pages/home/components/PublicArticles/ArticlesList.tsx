import React from 'react';
import ArticleCard from '@app/shared/modules/articleCard/containers/ArticleCard';
import { Article } from '@app/core/constants/entity/Article';

const ArticlesList = (props: {publicArticles: Article[]}) => {
  return (
    <ul className="row">
      {props.publicArticles.map((item) => (
        <li className="col col-lg-4 col-md-6 col-sm-12" key={item.id}>
          <ArticleCard item={item} className="article-card border-article-card" />
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;
