import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbarwebsite from "./components/Navbarwebsite";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Acceuil from "./pages/Acceuil";
import ProductDetails from "./pages/ProductDetails";
import Footer from './components/Footer';
import Produits from './pages/Produits';

function App() {
  return (
    <>
      <Navbarwebsite></Navbarwebsite>
      <Routes>
        <Route path="/" element={<Acceuil></Acceuil>}></Route>
        <Route path="/produit" element={<ProductDetails></ProductDetails>}></Route>
        <Route path="/produits" element={<Produits></Produits>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
