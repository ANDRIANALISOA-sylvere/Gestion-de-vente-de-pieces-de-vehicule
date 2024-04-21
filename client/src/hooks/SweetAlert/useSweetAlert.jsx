import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const useSweetAlert = () => {
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
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  }, []);

  return {
    showConfirmationAlert,
  };
};
