import React from 'react';
import { Article } from '@app/core/constants/entity/Article';
import UserArticleItem from './UserArticleItem';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';

const UserArticlesList = (props: {
  articlesList: Article[];
  heading: string;
  message: string;
  isReaction: boolean;
  parentCallback?: Function;
  page?: number;
  loading?: boolean;
  isLoadMore?: boolean;
}) => {
  const handleLoadMore = () => {
    props.parentCallback(props.page + 1);
  };
  return (
    <section className="user-article">
      <div className="container container-sm">
        <h3 className="section-title">{props.heading}</h3>
        {props.articlesList.length ? (
          props.articlesList.map((item) => (
            <UserArticleItem
              key={item.id}
              article={item}
              isReaction={props.isReaction}
              section={props.heading}
            />
          ))
        ) : (
          <p>{props.message}</p>
        )}
        {props.heading === 'Recyclebin' && props.isLoadMore && (
          <div className="public-pagination">
            <LoadingButton
              loading={props.loading}
              handleFunction={handleLoadMore}
              classBtn="btn btn-primary btn-show"
            >
              Show more posts
            </LoadingButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserArticlesList;
