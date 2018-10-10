// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import school from './schoolReducer';
import schoolData from './schoolDataReducer';

const rootReducer = combineReducers({
  router,
  school,
  schoolData
});

export default rootReducer;
