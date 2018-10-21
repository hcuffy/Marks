/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import { HOME, SCHOOLINFO, CLASSROOM } from './constants/routes.json'
import App from './containers/App'
import Home from './containers/Home'
import Classroom from './containers/Classroom'
import SchoolInfo from './components/SchoolInfo'

export default () => (
  <App>
    <Switch>
      {[
        <Route exact key="1" path={SCHOOLINFO} component={SchoolInfo} />,
        <Route exact key="1" path={HOME} component={Home} />,
        <Route exact key="1" path={CLASSROOM} component={Classroom} />
      ]}
    </Switch>
  </App>
)
