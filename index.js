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
  knex("cliente").then((dados) => {
    res.send(dados);
  }, next);
});

// Clientes

server.get("/listaClientes", (req, res, next) => {
  knex("cliente").then((dados) => {
    res.send(dados);
  }, next);
});

server.post("/adicionaCliente", (req, res, next) => {
  knex("cliente")
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next);
});

server.patch("/atualizarCliente/:id", (req, res, next) => {
  const { id } = req.params;

  knex("cliente")
    .where("id", id)
    .update(req.body)
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError(`Erro`));
      }
      res.send("Dados atualizados com sucesso!");
    }, next);
});

server.del("/removerCliente/:id", (req, res, next) => {
  const { id } = req.params;

  knex("cliente")
    .where("id", id)
    .delete(req.body)
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError(`Erro ao remover cliente`));
      }
      res.send("Cliente removido com sucesso!");
    }, next);
});

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
