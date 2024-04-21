import { toast } from 'react-toastify';


export const useToast = () => {
  const notify = (message) => {
    toast.success(message, {
      position: 'top-center',
    });
  };

  const alertError = (message) => {
    toast.error(message, {
      position: 'top-center',
    });
  };

  return { notify, alertError };
};