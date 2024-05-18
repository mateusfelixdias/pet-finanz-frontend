import { toast as toastify } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const toast = (type: 'error' | 'success', message: string) => {
  return toastify[type](message, {
    autoClose: 3000,
    position: toastify.POSITION.TOP_RIGHT,
  });
};

export default toast;
