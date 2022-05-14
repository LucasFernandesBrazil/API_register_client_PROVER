const processData = require("../data/process.Data");

exports.getProcess = () => {
  return processData.getProcess();
};

exports.seachProcess = (id) => {
  return processData.searchProcess(id);
};

exports.registerProcess = (body) => {
  return processData.registerProcess(body);
};

exports.updateProcess = (body, id) => {
  return processData.updateProcess(body, id);
};

exports.removeProcess = (id) => {
  return processData.removeProcess(id);
};
