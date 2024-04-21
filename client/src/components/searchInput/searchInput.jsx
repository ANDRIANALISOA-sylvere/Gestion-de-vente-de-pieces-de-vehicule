import React from "react";
import { useForm } from "../../hooks/Form/useForm";

const SearchInput = ({ searchString, placeholder, onSearchChange }) => {
  const { values, handleChange, resetForm } = useForm({ searchString });

  const handleSearchChange = (e) => {
    handleChange(e);
    onSearchChange(e.target.value);
  };

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