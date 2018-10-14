// @flow
import {HANDLE_SCHOOL_DATA_DISPLAY } from '../actions/actionTypes';
import type { Action } from './types';
import { getSchoolData } from '../database/schoolDB';

const initialLoadState = {}

const handleDataSchoolReducer = (state = initialLoadState, action) => {
  switch (action.type) {
    case HANDLE_SCHOOL_DATA_DISPLAY:
    console.log('test');
        const { title, street, state, country, year } = action.payload.schoolData[0];
        return Object.assign({}, state, { title, street, state, country, year });
    default:
         return Object.assign({},initialLoadState);
  }
}

export default handleDataSchoolReducer;
