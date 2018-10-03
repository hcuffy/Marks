import {HANDLE_SCHOOL_DATA_DISPLAY } from '../actions/actionTypes';
import type { Action } from './types';

const initialLoadState = {
  'title':'Test Title',
  'street':'Test Street',
  'state':'Test State',
  'country':'Test Country',
  'year':'Test Year'
}

const handleDataSchoolReducer = (state = initialLoadState, action) => {

  switch (action.type) {
    case HANDLE_SCHOOL_DATA_DISPLAY:
        const { title, street, state, country, year } = action.payload;
        return Object.assign({}, state, { title, street, state, country, year });
    default:

    return Object.assign({},initialLoadState);
  }
}

export default handleDataSchoolReducer;
