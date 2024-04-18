if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const CategorieRoute = require("./Routes/CategorieRoute");
const MarqueRoute = require("./Routes/MarqueRoute");
const UtilisateurRoute = require("./Routes/UtilisateurRoute");
const ClientRoute = require("./Routes/ClientsRoute");
const FournisseurRoute = require("./Routes/FournisseurRoute");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middleware/utilisateurMiddleware");
const checkAuth = require("./Controllers/checkAuth");

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("*",AuthMiddleware.Auth);
app.use(CategorieRoute);
app.use(MarqueRoute);
app.use(UtilisateurRoute);
app.use(ClientRoute);
app.use(FournisseurRoute);
app.get("/checkauth", AuthMiddleware.Auth, checkAuth.chechUserAuth);
app.listen(
  process.env.PORT,
  console.log("server starting on port " + process.env.PORT)
);
