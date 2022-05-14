const express = require("express");
const router = express.Router();
const processService = require("../service/processService");

router.get("/listarProcessos", async (req, res) => {
  processService.getProcess().then((data) => {
    res.json(data);
  });
});

router.get("/pesquisaProcesso/:id", async (req, res) => {
  const { id } = req.params;

  processService.seachProcess(id).then((data) => {
    if (data.length === 0) {
      res.statusCode = 404;
      res.json("Id de Processo não encontrado");
      return res;
    }
    res.json(data);
  });
});

router.post("/adicionarProcesso", async (req, res) => {
  processService.registerProcess(req.body).then((data) => {
    if (!data) {
      res.statusCode = 500;
      res.json("Ocorreu um erro interno");
      return res;
    }
    res.json({
      msg: "Processo adicionado com sucesso!",
    });
    res.json(data);
  });
});

router.patch("/atualizarProcesso/:id", async (req, res) => {
  const { id } = req.params;

  processService.updateProcess(req.body, id).then((data) => {
    if (!data) {
      res.statusCode = 404;
      res.json("Id de processo não encontrado");
      return res;
    }
    res.json({
      msg: "Dados alterados com sucesso!",
    });
  });
});

router.delete("/removerProcesso/:id", async (req, res) => {
  const { id } = req.params;

  processService.removeProcess(id).then((data) => {
    if (!data) {
      res.statusCode = 404;
      res.json("Id de processo não encontrado");
      return res;
    }
    res.json({
      msg: `O processo foi excluído!`,
    });
  });
});

module.exports = router;
