/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import { HOME, SCHOOLINFO } from './constants/routes.json'
import App from './containers/App'
import Home from './containers/Home'
import SchoolInfo from './components/SchoolInfo'

export default () => (
  <App>
    <Switch>
      <Route path={SCHOOLINFO} component={SchoolInfo} />
      <Route path={HOME} component={Home} />
    </Switch>
  </App>
)
