const express = require("express");
const router = express.Router();
const clientsService = require("../service/clientsService");

router.get("/listarClientes", async (req, res) => {
  clientsService.getClient().then((data) => {
    res.json(data);
  });
});

router.get("/pesquisaCliente/:id", async (req, res) => {
  const { id } = req.params;

  clientsService.seachClient(id).then((data) => {
    if (data.length === 0) {
      res.statusCode = 404;
      res.json("Id de cliente não encontrado");
      return res;
    }
    res.json(data);
  });
});

router.post("/adicionarCliente", async (req, res) => {
  clientsService.registerClient(req.body).then((data) => {
    if (!data) {
      res.statusCode = 500;
      res.json("Ocorreu um erro interno");
      return res;
    }
    res.json({
      msg: "Cliente adicionado com sucesso!",
    });
    res.json(data);
  });
});

router.patch("/atualizarCliente/:id", async (req, res) => {
  const { id } = req.params;

  clientsService.updateClient(req.body, id).then((data) => {
    if (!data) {
      res.statusCode = 404;
      res.json("Id de cliente não encontrado");
      return res;
    }
    res.json({
      msg: "Dados alterados com sucesso!",
    });
  });
});

router.delete("/removerCliente/:id", async (req, res) => {
  const { id } = req.params;

  clientsService.removeClient(id).then((data) => {
    if (!data) {
      res.statusCode = 404;
      res.json("Id de cliente não encontrado");
      return res;
    }
    res.json({
      msg: `O cliente foi excluído!`,
    });
  });
});

module.exports = router;
