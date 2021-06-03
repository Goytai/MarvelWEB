import React from 'react';
import { Switch } from 'react-router-dom';

import Item from 'src/pages/Item';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/:type/:marvelId" component={Item} isPrivate />
  </Switch>
);

export default Routes;
