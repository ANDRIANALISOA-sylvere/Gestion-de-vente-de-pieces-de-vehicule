// components/PaginatedTable.js
import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginatedTable = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentItems,
    renderPageNumbers,
    handlePageChange,
    currentPage,
    totalPages,
  };
};

export default PaginatedTable;
