import { HANDLE_SCHOOL_DATA } from '../actions/actionTypes';
import type { Action } from './types';

const handleSchoolReducer = (state: number = 0, action: Action) => {

  switch (action.type) {
    case HANDLE_SCHOOL_DATA:
    console.log('test');
    default:
      return state;
  }
}

export default handleSchoolReducer;
