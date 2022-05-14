const express = require("express");
const app = express();

app.use(express.json());
app.use("/cliente", require("./route/clientsRoutes"));

app.listen(8080);
