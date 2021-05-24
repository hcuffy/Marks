import React from 'react';
import {Switch, Route} from 'react-router';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {HOME, CLASSROOM, STUDENTS, GRADES, GRAPHS, NOTES, CAPABILITY, SETTINGS, CALENDAR} from '../constants/routes.js';
import {App, Calendar, Capability, Classroom, Home, Grades, Graphs, Notes, Settings, Students} from './';

const Root = ({store, history}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    {[
                        <Route exact key='1' path={HOME} component={Home}/>,
                        <Route exact key='1' path={CLASSROOM} component={Classroom}/>,
                        <Route exact key='1' path={STUDENTS} component={Students}/>,
                        <Route exact key='1' path={GRADES} component={Grades}/>,
                        <Route exact key='1' path={GRAPHS} component={Graphs}/>,
                        <Route exact key='1' path={NOTES} component={Notes}/>,
                        <Route exact key='1' path={CAPABILITY} component={Capability}/>,
                        <Route exact key='1' path={CALENDAR} component={Calendar}/>,
                        <Route exact key='1' path={SETTINGS} component={Settings}/>
                    ]}
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>);

export default Root;
