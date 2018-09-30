import type { GetState, Dispatch } from '../reducers/types';
import { HANDLE_SCHOOL_DATA } from './actionTypes';
import { addSchoolData } from '../database/schoolDB';

const handleSchoolData = (event) => {
  event.preventDefault();

  const formData = {
    title: event.target.title.value,
    street: event.target.street.value,
    state: event.target.state.value,
    country: event.target.country.value
  };

addSchoolData(formData)

 return {
      type: HANDLE_SCHOOL_DATA,
      payload: formData
}
};


export default handleSchoolData;
