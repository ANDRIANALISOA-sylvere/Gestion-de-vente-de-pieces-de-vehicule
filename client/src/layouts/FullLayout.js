import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const FullLayout = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/checkauth/", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [token]);
  return (
    <main>
      {/********header**********/}
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Header user={user} />
          <Container className="pe-4 ps-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
