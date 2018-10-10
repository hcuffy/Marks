import { toast } from 'react-toastify';
import type { GetState, Dispatch } from '../reducers/types';
import {
         HANDLE_SCHOOL_DATA ,
         HANDLE_SCHOOL_DATA_DISPLAY
       } from './actionTypes';
import { addSchoolData, getSchoolData } from '../database/schoolDB';

export const handleSchoolData = (formData) => {
addSchoolData(formData)
   return {
        type: HANDLE_SCHOOL_DATA,
        payload: formData
    }
};

export const handleSchoolDataDisplay = () => {
const info =  getSchoolData()
 return {
      type: HANDLE_SCHOOL_DATA_DISPLAY,
      payload: {schoolData: info}
    }
};
