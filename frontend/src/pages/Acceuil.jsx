import React from "react";
import { Card } from "../components/Card";
export default function Acceuil() {
  return (
    <div>
      <div className="container mt-3">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
}
