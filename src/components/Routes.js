import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/index';
import Register from './Register/index';
import Home from './Home/index';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/Register" component={Register} />
      <PrivateRoute path="/home" component={Home} />
    </Router>
  );
};

export default Routes;
