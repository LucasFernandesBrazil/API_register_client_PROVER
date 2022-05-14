const database = require("../infra/database");

exports.getClient = () => {
  return database("cliente");
};

exports.searchClient = (id) => {
  return database("cliente").where("id", id);
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
