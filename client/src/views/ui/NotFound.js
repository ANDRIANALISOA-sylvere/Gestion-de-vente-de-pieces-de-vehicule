import React, { useContext } from "react";
import { UserContext } from "../../context/checkauth";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function NotFound() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  return (
    <div>
      <h1>404 Not Found</h1>
      {user ? (
        <Link to="/vente">
          <Button>Aller à la page d'acceuil</Button>
        </Link>
      ) : ( 
        <Link to="/login">
          <Button>Aller à la page d'accueil</Button>
        </Link>
      )}
    </div>
  );
}

export default NotFound;
