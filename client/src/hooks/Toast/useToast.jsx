import { toast } from 'react-toastify';


export const useToast = () => {
  const notify = (message) => {
    toast.success(message, {
      position: 'top-right',
    });
  };

  const alertError = (message) => {
    toast.error(message, {
      position: 'top-right',
    });
  };

  return { notify, alertError };
};