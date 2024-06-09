import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Création d'une instance de SweetAlert2 avec la prise en charge de React
const MySwal = withReactContent(Swal);

// Hook custom useSweetAlert
export const useSweetAlert = () => {
  // Fonction pour afficher une alerte de confirmation avant de supprimer une ligne
  const showConfirmationAlert = useCallback((onConfirm) => {
    MySwal.fire({
      title: "Confirmation de suppression",
      text: "Vous êtes sur le point de supprimer cette ligne. Cette action est irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      // Si la confirmation est acceptée, appelle la fonction onConfirm
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  }, []);

  // Retour de la fonction pour afficher l'alerte de confirmation
  return { showConfirmationAlert };
};
