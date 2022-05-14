const clientsData = require("../data/clientsData");

exports.getClient = () => {
  return clientsData.getClient();
};

exports.seachClient = (id) => {
  return clientsData.searchClient(id);
};

exports.getProcess = (id) => {
  return clientsData.getProcess(id);
};

exports.registerClient = (body) => {
  return clientsData.registerClient(body);
};

exports.updateClient = (body, id) => {
  return clientsData.updateClient(body, id);
};

exports.removeClient = (id) => {
  return clientsData.removeClient(id);
};
