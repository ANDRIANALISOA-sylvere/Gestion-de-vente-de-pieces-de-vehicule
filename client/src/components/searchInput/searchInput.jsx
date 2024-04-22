// Importation des dépendances nécessaires
import React from "react";
import { useForm } from "../../hooks/Form/useForm";

// Composant SearchInput
const SearchInput = ({ searchString, placeholder, onSearchChange }) => {
  // Utilisation du hook useForm pour gérer le formulaire
  const { values, handleChange, resetForm } = useForm({ searchString });

  // Fonction pour gérer le changement de la recherche
  const handleSearchChange = (e) => {
    handleChange(e); // Mettre à jour les valeurs du formulaire
    onSearchChange(e.target.value); // Appeler la fonction de rappel onSearchChange avec la nouvelle valeur
  };

  // Rendu du composant
  return (
    <div>
      <form>
        <input
          type="search"
          className="form-control"
          placeholder={placeholder}
          name="searchString"
          value={values.searchString}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default SearchInput;
