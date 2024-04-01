import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import PublicRoutes from "./components/Routes/PublicRoutes";
import AdminRoutes from "./components/Routes/AdminRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes></PublicRoutes>}></Route>
      <Route path="/admin/*" element={<AdminRoutes></AdminRoutes>}></Route>
    </Routes>
  );
}

export default App;
