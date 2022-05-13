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

server.get("/show/:id", (req, res, next) => {
  const { id } = req.params;

  knex("teste")
    .where("id", id)
    .first() //Apenas o primeiro resultado
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError(`Não foi encontrado ${id}`));
      }
      res.send(dados);
    }, next);
});

server.put("/update/:id", (req, res, next) => {
  const { id } = req.params;

  knex("teste")
    .where("id", id)
    .update(req.body)
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError(`Erro`));
      }
      res.send("Dados atualizados");
    }, next);
});

server.del("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  knex("teste")
    .where("id", id)
    .delete(req.body)
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError(`Erro`));
      }
      res.send("Dados excluidos");
    }, next);
});

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
