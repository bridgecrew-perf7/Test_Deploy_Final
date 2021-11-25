import React from 'react';
import PostContent from './PostContent';

const PostPreview = ({ post }) => {
  return (
    <div className="post-detail post-preview">
      <div className="container">
        <h2 className="post-title mb-10 mt-4">{post.title}</h2>
        <div className="cover-img-container">
          <img
            className="cover-img"
            src={post.cover || '/assets/images/default_cover.jpg'}
            alt={post.title}
          />
        </div>
        <PostContent content={post.content} />
      </div>
    </div>
  );
};

export default PostPreview;
