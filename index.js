const restify = require("restify");
const errors = require("restify-errors");

const server = restify.createServer({
  name: "myapp",
  version: "1.0.0",
});

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "api_prover",
  },
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Routes

server.get("/", (req, res, next) => {
  knex("teste").then((dados) => {
    res.send(dados);
  }, next);
});

server.post("/create", (req, res, next) => {
  knex("teste")
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next);
});

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
