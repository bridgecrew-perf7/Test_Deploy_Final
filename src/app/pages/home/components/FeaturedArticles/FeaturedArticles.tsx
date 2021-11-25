import { Article } from '@app/core/constants/entity/Article';
import React from 'react';
import FeaturedList from './FeaturedList';

const FeaturedArticles = (props: {featuredList: Article[]}) => {
  return (
    <section className="featured" id="featured">
      <div className="container">
        <h3 className="section-title">Featured Posts</h3>
        <FeaturedList featuredList={props.featuredList}/>
      </div>
    </section>
  );
};

export default FeaturedArticles;
