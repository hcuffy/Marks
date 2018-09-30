import {ToastContainer, ToastStore} from 'react-toasts';
import React from 'react';
export function generalSuccess()  {
  <ToastContainer store={ToastStore}/>
    return ToastStore.success('Test')
}
