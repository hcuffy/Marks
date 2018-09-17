// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import school from './school';

const rootReducer = combineReducers({
  school,
  router
});

export default rootReducer;
