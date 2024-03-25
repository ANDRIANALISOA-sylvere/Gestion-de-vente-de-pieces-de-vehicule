import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbarwebsite from "./components/Navbarwebsite";
import "./App.css";
import {Card} from "./components/Card";
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbarwebsite></Navbarwebsite>
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
      <Footer></Footer>
    </>
  );
}

export default App;
