import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/accueil" /> },
      { path: "/accueil", exact: true, element: <Starter /> },
      { path: "/profile", exact: true, element: <About /> },
      { path: "/fournisseurs", exact: true, element: <Alerts /> },
      { path: "/clients", exact: true, element: <Badges /> },
      { path: "/categories", exact: true, element: <Buttons /> },
      { path: "/marques", exact: true, element: <Cards /> },
      { path: "/pieces", exact: true, element: <Grid /> },
      { path: "/stocks", exact: true, element: <Tables /> },
      { path: "/commandes", exact: true, element: <Forms /> },
      { path: "/employes", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
