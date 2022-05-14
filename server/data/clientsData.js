const database = require("../infra/database");

exports.getClient = () => {
  return database("cliente");
};

exports.searchClient = (id) => {
  return database("cliente").where("id", id);
};

exports.getProcess = (id) => {
  return database
    .table("cliente")
    .innerJoin("processo", "cliente.id", "=", "processo.cliente_id")
    .select("processo.numero_processo", "processo.id", "processo.situacao");
};

exports.registerClient = (body) => {
  return database("cliente").insert(body);
};

exports.updateClient = (body, id) => {
  return database("cliente").where("id", id).update(body);
};

exports.removeClient = (id) => {
  return database("cliente").where("id", id).delete();
};
