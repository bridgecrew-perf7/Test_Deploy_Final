import React from 'react';
import { Outlet } from 'react-router';

const Page = () => {
  return (
    <div className="pages-container">
      <Outlet />
    </div>
  );
};

export default Page;
