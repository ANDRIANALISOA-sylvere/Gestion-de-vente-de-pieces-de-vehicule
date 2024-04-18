if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const CategorieRoute = require('./Routes/CategorieRoute')
const MarqueRoute = require('./Routes/MarqueRoute')
const ClientRoute = require('./Routes/ClientsRoute')
const FournisseurRoute = require('./Routes/FournisseurRoute')
const PieceRoute = require('./Routes/PiecesRoute')
const EntreeRoute = require('./Routes/EntreeStockRoute')
const SortieRoute = require('./Routes/SortieRoute')
const CommandeRoute = require('./Routes/CommandesRoute')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(CategorieRoute);
app.use(MarqueRoute);
app.use(ClientRoute);
app.use(FournisseurRoute);
app.use(PieceRoute)
app.use(EntreeRoute)
app.use(SortieRoute)
app.use(CommandeRoute)
app.listen(process.env.PORT, console.log("server starting on port " + process.env.PORT));
