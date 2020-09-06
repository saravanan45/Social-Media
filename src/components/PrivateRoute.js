import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const isAuthenticated = () => {
    if (accessToken && accessToken.length) {
      return true;
    }
    return false;
  };
  return (
    <Route
      {...props}
      render={props =>
        isAuthenticated() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
