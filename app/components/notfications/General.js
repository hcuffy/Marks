import {ToastContainer, ToastStore} from 'react-toasts';


exports.generalSuccess = () => ToastStore.success("Save was successful.")

<ToastContainer position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore}/>
