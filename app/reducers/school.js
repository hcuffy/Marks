import { HANDLE_SCHOOL_DATA } from '../actions/actionTypes';
import type { Action } from './types';

export default function handleSchoolData(state: number = 0, action: Action) {
  switch (action.type) {
    case HANDLE_SCHOOL_DATA:
    console.log(state.number);
      return {};
    default:
      return state;
  }
}
