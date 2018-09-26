// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import school from './schoolReducer';

const rootReducer = combineReducers({
  school,
  router
});

export default rootReducer;
