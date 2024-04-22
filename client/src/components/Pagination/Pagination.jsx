// Importation des dépendances nécessaires
import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// Composant PaginatedTable
const PaginatedTable = ({ data, itemsPerPage }) => {
  // État pour la page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Fonction pour gérer le changement de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fonction pour générer les numéros de page
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Boucle pour créer les numéros de page
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationItem key={i} active={i === currentPage}>
          <PaginationLink onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  // Calcul des index de début et de fin pour les éléments à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Extraction des éléments à afficher
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Retour des éléments nécessaires pour la pagination
  return {
    currentItems,
    renderPageNumbers,
    handlePageChange,
    currentPage,
    totalPages,
  };
};

export default PaginatedTable;
