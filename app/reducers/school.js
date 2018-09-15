import { SCHOOL_TEST } from '../actions/school';
import type { Action } from './types';

export default function counter(state: number = 0, action: Action) {
  switch (action.type) {
    case SCHOOL_TEST:
      return {};
    default:
      return state;
  }
}
