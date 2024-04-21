import React from "react";
import { useFecth } from "../../hooks/Fetch/useFetch";
import Loader from "../../layouts/loader/Loader";

const Categorie = () => {
  const { donne, loading, error } = useFecth(
    "http://localhost:5000/categorie/"
  );
  return (
    <div>
      {loading && <Loader></Loader>}
      {JSON.stringify(donne)}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Categorie;
