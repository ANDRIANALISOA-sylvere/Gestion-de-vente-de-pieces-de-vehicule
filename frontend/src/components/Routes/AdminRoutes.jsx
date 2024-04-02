import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Admin/Home";
import AdminLayout from "../Layouts/AdminLayout";

function AdminRoutes() {
  return (
    <Routes>
      <Route  element={<AdminLayout></AdminLayout>}>
        <Route path="" element={<Home></Home>}></Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
