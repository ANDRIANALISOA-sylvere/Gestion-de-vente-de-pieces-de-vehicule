import { useEffect, useState } from "react";
import BarChart from "../components/chart/chart";
import DoughnutChart from "../components/chart/doughnut";
import Item from "../components/dashboard/Item";
import axios from "axios";
const Acceuil = () => {
  const [meilleurclient, setMeilleurClient] = useState([]);
  useEffect(() => {
    const getmeilleurclient = async () => {
      try {
        const res = await axios.get("http://localhost:5000/meilleurclient");
        const data = await res.data;
        setMeilleurClient(data);
      } catch (error) {
        console.log(error);
      }
    };

    getmeilleurclient();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <Item></Item>
          <div className="card">
            <div className="card-body d-flex justify-content-center">
              <BarChart></BarChart>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Meilleurs clients</h5>
              <hr style={{ opacity: "0.1" }} />
              {meilleurclient.map((client, index) => {
                return <div key={index} className="mt-3">
                    <strong>{client.Nom}</strong>
                  <br />
                  <div className="d-flex justify-content-between">
                  <div className="word-break">
                    <small className="text-muted">
                      {client.email} {client.Tel}
                    </small>
                  </div>
                  <div className="word-break">
                    <span className="badge bg-danger font-12 text-white font-weight-medium rounded-pill ms-2 d-lg-block d-md-none">
                      {client.nb_commandes} commandes
                    </span>
                  </div>
                </div>
                </div>
              })}
            </div>
          </div>
          {/* <div className="card">
            <div className="card-body">
              <DoughnutChart></DoughnutChart>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Acceuil;
