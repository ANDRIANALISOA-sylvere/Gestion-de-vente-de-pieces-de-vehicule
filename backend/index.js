if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CategorieRoute = require('./Routes/CategorieRoute')
const MarqueRoute = require('./Routes/MarqueRoute')
const ClientRoute = require('./Routes/ClientsRoute')
const FournisseurRoute = require('./Routes/FournisseurRoute')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CategorieRoute);
app.use(MarqueRoute);
app.use(ClientRoute);
app.use(FournisseurRoute);
app.listen(process.env.PORT, console.log("server starting on port " + process.env.PORT));
