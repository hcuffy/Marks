/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import { HOME, SCHOOL, CLASSROOM, STUDENTS } from './constants/routes.json'
import App from './containers/App'
import Home from './containers/Home'
import Classroom from './containers/Classroom'
import School from './containers/School'
import Students from './containers/Students'

export default () => (
	<App>
		<Switch>
			{[
				<Route exact key="1" path={SCHOOL} component={School} />,
				<Route exact key="1" path={HOME} component={Home} />,
				<Route exact key="1" path={CLASSROOM} component={Classroom} />,
				<Route exact key="1" path={STUDENTS} component={Students} />
			]}
		</Switch>
	</App>
)
