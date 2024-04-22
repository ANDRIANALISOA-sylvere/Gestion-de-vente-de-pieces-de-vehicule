import { toast } from 'react-toastify';

// Hook custom useToast
export const useToast = () => {
  // Fonction pour afficher une notification de succès
  const notify = (message) => {
    toast.success(message, {
      position: 'top-right',
    });
  };

  // Fonction pour afficher une notification d'erreur
  const alertError = (message) => {
    toast.error(message, {
      position: 'top-right',
    });
  };

  // Retour des fonctions pour afficher les notifications
  return { notify, alertError };
};