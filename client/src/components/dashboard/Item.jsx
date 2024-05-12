import { CgShare } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillFileAdd } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Item() {
  const [commandes, setCommandes] = useState(0);
  const [clients, setClients] = useState(0);
  const [sommequantite, setSommeQuantite] = useState(0);
  const [pieces, setPieces] = useState(0);
  const [recettes, setRecettes] = useState(0);
  useEffect(() => {
    const countcommande = async () => {
      try {
        const res = await axios.get("http://localhost:5000/countcommande");
        const data = await res.data;
        setCommandes(data[0].commandes);
      } catch (error) {
        console.log(error);
      }
    };
    const countclient = async () => {
      try {
        const res = await axios.get("http://localhost:5000/countclient");
        const data = await res.data;
        setClients(data[0].clients);
      } catch (error) {
        console.log(error);
      }
    };
    const sommequantite = async () => {
      try {
        const res = await axios.get("http://localhost:5000/sommequantite");
        const data = await res.data;
        setSommeQuantite(data[0].sommequantite);
      } catch (error) {
        console.log(error);
      }
    };
    const countpiece = async () => {
      try {
        const res = await axios.get("http://localhost:5000/countpiece");
        const data = await res.data;
        setPieces(data[0].pieces);
      } catch (error) {
        console.log(error);
      }
    };
    const recettes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/recettes");
        const data = await res.data;
        setRecettes(data[0].recettes);
      } catch (error) {
        console.log(error);
      }
    };
    countcommande();
    countclient();
    sommequantite();
    countpiece();
    recettes();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-left">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="d-inline-flex align-items-center">
                      <h2 className="text-white mb-1 font-weight-medium">
                        {commandes}
                      </h2>
                      <span className="badge bg-primary font-12 text-white font-weight-medium rounded-pill ms-2 d-lg-block d-md-none">
                        {sommequantite} pieces
                      </span>
                    </div>
                    <h6 className="text-white font-weight-normal mb-0 w-100 text-truncate">
                      Commandes
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6">
                      <AiOutlineShoppingCart style={{ color: "#e2e8f0" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                      <sup className="set-doller">Ar</sup>{recettes}
                    </h2>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Gains du Mois
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6">
                      <AiOutlineDollarCircle style={{ color: "#e2e8f0" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="d-inline-flex align-items-center">
                      <h2 className="text-dark mb-1 font-weight-medium">
                        {clients}
                      </h2>
                      {/* <span className="badge bg-danger font-12 text-white font-weight-medium rounded-pill ms-2 d-md-none d-lg-block">
                        -18.33%
                      </span> */}
                    </div>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Clients
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6">
                      <AiOutlineUser style={{ color: "#e2e8f0" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {pieces}
                    </h2>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Pièces
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6">
                      <CgShare style={{ color: "#e2e8f0" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
