import React from "react";
import { Card } from "../components/Card";

function Favoris() {
  return (
    <div className="container mt-5">
      <h4 className="text-muted">Tous vos favoris :</h4>
      <hr style={{ opacity: "0.1" }} />
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 mt-3">
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
}

export default Favoris;
