import React from 'react';
import { Outlet } from 'react-router';

const Post = () => {
  return (
    <div className="post-container">
      <Outlet />
    </div>
  );
};

export default Post;
