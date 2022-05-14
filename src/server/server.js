const express = require("express");
const app = express();

app.use(express.json());
app.use("/cliente", require("./route/clientsRoutes"));
app.use("/processo", require("./route/processRoutes"));

app.listen(8080);
