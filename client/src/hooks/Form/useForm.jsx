import { useState } from "react";

// Hook custom useForm
export const useForm = (initialValues) => {
  // État pour stocker les valeurs du formulaire
  const [values, setValues] = useState(initialValues);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Fonction pour réinitialiser le formulaire avec les valeurs initiales
  const resetForm = () => {
    setValues(initialValues);
  };

  // Retour des fonctions et de l'état pour être utilisés dans le composant
  return { values, handleChange, resetForm };
};
