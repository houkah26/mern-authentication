import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import Register from './RegisterPage';
import Login from './LoginPage';
import Dashboard from './Dashboard';
import NotFoundPage from './NotFoundPage';
import RequireAuth from '../auth/RequireAuth';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={RequireAuth(Dashboard)} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Routes;