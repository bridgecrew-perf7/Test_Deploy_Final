import React from 'react';
import { Outlet } from 'react-router';

const Account = () => {
  return (
    <div className="account-page">
      <div className="heading mb-10"></div>
      <Outlet />
    </div>
  );
};

export default Account;
