import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import Register from './components/pages/RegisterPage';
import Login from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import NotFoundPage from './components/pages/NotFoundPage';
import RequireAuth from './components/auth/RequireAuth';

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