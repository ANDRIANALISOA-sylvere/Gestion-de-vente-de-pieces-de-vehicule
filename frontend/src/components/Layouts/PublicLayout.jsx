import React from "react";
import { Outlet } from "react-router-dom";
import Navbarwebsite from "../Navbarwebsite";
import Footer from "../Footer";

function PublicLayout() {
  return (
    <div>
      <Navbarwebsite></Navbarwebsite>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default PublicLayout;
