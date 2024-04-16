import { lazy } from "react";
import { Navigate } from "react-router-dom";

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

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/accueil" /> },
      { path: "/accueil", exact: true, element: <Acceuil /> },
      { path: "/profile", exact: true, element: <Profile /> },
      { path: "/fournisseurs", exact: true, element: <Fournisseur /> },
      { path: "/clients", exact: true, element: <Client /> },
      { path: "/categories", exact: true, element: <Categorie /> },
      { path: "/marques", exact: true, element: <Marque /> },
      { path: "/pieces", exact: true, element: <Piece /> },
      { path: "/stocks", exact: true, element: <Stock /> },
      { path: "/commandes", exact: true, element: <Commande /> },
      { path: "/employes", exact: true, element: <Employe /> },
    ],
  },
];

export default ThemeRoutes;
