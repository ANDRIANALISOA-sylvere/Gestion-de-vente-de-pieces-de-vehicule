import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbarwebsite from "./components/Navbarwebsite";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Acceuil from "./pages/Acceuil";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Produits from "./pages/Produits";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Navbarwebsite></Navbarwebsite>
      <Routes>
        <Route path="/" element={<Acceuil></Acceuil>}></Route>
        <Route
          path="/produit"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/produits" element={<Produits></Produits>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
