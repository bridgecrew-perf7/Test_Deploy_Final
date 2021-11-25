import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoute } from './PrivateRoute';
import { useSelector } from 'react-redux';

const renderRoute = (routes) => {
  return routes.map((route: any, index: number) => {
    // Redirect router
    if (route.redirect && !route.element) {
      route.element = () => <Navigate to={route.redirect} />;
    }

    const PrivateRoute = privateRoute(route.element);

    return (
      <Route
        key={index}
        path={route.path}
        element={route.isProtected ? <PrivateRoute /> : <route.element />}
      >
        {route.children && renderRoute(route.children)}
      </Route>
    );
  });
};

export const RouterOutlet = ({ routes }) => {
  const authState = useSelector((state: any) => state.authReducer);
  return <Routes>{renderRoute(routes)}</Routes>;
};
