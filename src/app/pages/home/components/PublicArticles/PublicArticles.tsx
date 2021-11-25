import { Article } from '@app/core/constants/entity/Article';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';
import React from 'react';
import ArticlesList from './ArticlesList';

const PublicArticles = (props: {
  publicArticles: Article[];
  parentCallback;
  page;
  loading;
  title
}) => {
  const handleLoadMore = () => {
    props.parentCallback(props.page + 1);
  };
  return (
    <section className="public" id="post-list">
      <div className="container">
        <h3 className="section-title">{
          props.title
        }</h3>
        <ArticlesList publicArticles={props.publicArticles} />
        <div className="public-pagination">
          <LoadingButton
            loading={props.loading}
            handleFunction={handleLoadMore}
            classBtn="btn btn-primary btn-show"
          >
            Show more posts
          </LoadingButton>
        </div>
      </div>
    </section>
  );
};

export default PublicArticles;
