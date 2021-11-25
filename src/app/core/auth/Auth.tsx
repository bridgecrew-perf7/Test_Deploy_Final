import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  const authState = useSelector((state: any) => state.authReducer);
  if (!!authState.data?.userInfo) {
    return <Navigate to="/" />;
  }
  return (
    <div className="auth-page">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
