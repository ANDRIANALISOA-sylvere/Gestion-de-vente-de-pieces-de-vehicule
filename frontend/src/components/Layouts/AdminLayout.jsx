import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default AdminLayout;
