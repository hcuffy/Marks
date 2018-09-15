// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import school from './school';

const rootReducer = combineReducers({
  school,
  counter,
  router
});

export default rootReducer;
