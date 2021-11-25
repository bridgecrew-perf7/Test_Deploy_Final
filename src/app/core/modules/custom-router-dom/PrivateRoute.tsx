import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

export const privateRoute = (Wrapped) => {
  return (props) =>
    isAuthenticated() ? <Wrapped /> : <Navigate to="/auth/login" />;
};
