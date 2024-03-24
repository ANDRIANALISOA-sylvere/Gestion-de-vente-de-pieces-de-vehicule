import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbarwebsite from "./components/Navbarwebsite";
import "./App.css";
import {Card} from "./components/Card";

function App() {
  return (
    <>
      <Navbarwebsite></Navbarwebsite>
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </>
  );
}

export default App;
