/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import {HOME, SCHOOL} from './constants/routes.json';
import App from './containers/App';
import Home from './components/Home';
import School from './components/School';

export default () => (
  <App>
    <Switch>
      <Route path={SCHOOL} component={School} />
      <Route path={HOME} component={Home} />
    </Switch>
  </App>
);
