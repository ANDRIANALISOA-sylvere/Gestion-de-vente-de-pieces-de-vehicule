import React from "react";
import { Route, Routes } from "react-router-dom";
import Acceuil from "../../pages/Acceuil";
import ProductDetails from "../../pages/ProductDetails";
import Produits from "../../pages/Produits";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Favoris from "../../pages/Favoris";
import PublicLayout from "../Layouts/PublicLayout";

function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout></PublicLayout>}>
        <Route path="" element={<Acceuil></Acceuil>}></Route>
        <Route
          path="produit"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="produits" element={<Produits></Produits>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="favoris" element={<Favoris></Favoris>}></Route>
      </Route>
    </Routes>
  );
}

export default PublicRoutes;
