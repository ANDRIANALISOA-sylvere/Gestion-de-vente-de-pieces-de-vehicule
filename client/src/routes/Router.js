import { lazy, useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout.js";
import { UserContext } from "../context/checkauth.js";
import { RoleGuard } from "../components/RoleGuard/RoleGuard.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Acceuil = lazy(() => import("../views/Acceuil.js"));
const Profile = lazy(() => import("../views/Profile.js"));
const Fournisseur = lazy(() => import("../views/ui/Fournisseur.js"));
const Client = lazy(() => import("../views/ui/Client.js"));
const Categorie = lazy(() => import("../views/ui/Categorie.js"));
const Marque = lazy(() => import("../views/ui/Marque.js"));
const Piece = lazy(() => import("../views/ui/Piece.js"));
const Stock = lazy(() => import("../views/ui/Stock.js"));
const Commande = lazy(() => import("../views/ui/Commande.js"));
const Employe = lazy(() => import("../views/ui/Employe.js"));
const Login = lazy(() => import("../views/Login.jsx"));
const NotFound = lazy(() => import("../views/ui/NotFound.js"));

/*****Routes******/
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const PrivateRouteLogin = ({ children }) => {
  const token = localStorage.getItem("token");
  return !token ? children : <Navigate to="/vente" replace />;
};

const ThemeRoutes = [
  {
    path: "/",
    element: (
      <PrivateRouteLogin>
        <LoginLayout />
      </PrivateRouteLogin>
    ),
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", exact: true, element: <Login /> },
    ],
  },
  {
    path: "/vente",
    element: (
      <PrivateRoute>
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/vente", element: <Navigate to="/vente/accueil" /> },
      { path: "/vente/accueil", exact: true, element: <Acceuil /> },
      { path: "/vente/profile", exact: true, element: <Profile /> },
      { path: "/vente/fournisseurs", exact: true, element: <Fournisseur /> },
      { path: "/vente/clients", exact: true, element: <Client /> },
      { path: "/vente/categories", exact: true, element: <Categorie /> },
      { path: "/vente/marques", exact: true, element: <Marque /> },
      { path: "/vente/pieces", exact: true, element: <Piece /> },
      { path: "/vente/stocks", exact: true, element: <Stock /> },
      { path: "/vente/commandes", exact: true, element: <Commande /> },
      {
        path: "/vente/employes",
        exact: true,
        element: (
          <RoleGuard requiredRole="Administrateur">
            <Employe />
          </RoleGuard>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default ThemeRoutes;
