// @flow
import { HANDLE_SCHOOL_DATA } from '../actions/actionTypes';
import type { Action } from './types';

const initialLoadState = {
  'title':'placeholder',
  'street':'placeholder',
  'state':'placeholder',
  'country':'placeholder',
  'year':'placeholder'
}

const handleSchoolReducer = (state = initialLoadState, action) => {
  switch (action.type) {
    case HANDLE_SCHOOL_DATA:
       const { title, street, state, country, year } = action.payload;
       return Object.assign({}, state, { title, street, state, country, year });
    default:
      return Object.assign({},initialLoadState);
  }
}

export default handleSchoolReducer;
