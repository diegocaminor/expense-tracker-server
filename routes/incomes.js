const express = require("express");
var ObjectId = require("mongoose").Types.ObjectId;
const IncomesService = require("../services/incomes");

// Routes that are responsible for communicating with the incomes services
function incomesApi(app) {
  const router = express.Router();
  app.use("/api/incomes", router);
  const incomesService = new IncomesService();

  router.get("/", async function (req, res, next) {
    try {
      const incomes = await incomesService.getIncomes();
      res.status(200).json({
        data: incomes,
        message: "incomes listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:incomeId", async function (req, res, next) {
    try {
      const { incomeId } = req.params;
      if (!ObjectId.isValid(incomeId)) throw new Error("Invalid id");
      const income = await incomesService.getIncome({ incomeId });
      res.status(200).json({
        data: income,
        message: "income retrieve",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      const { body: income } = req;
      const createdIncomeId = await incomesService.createIncome({
        income,
      });
      res.status(201).json({
        data: createdIncomeId,
        message: "income created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:incomeId", async function (req, res, next) {
    try {
      const { incomeId } = req.params;
      const { body: income } = req;
      const updatedIncomeId = await incomesService.updateIncome({
        incomeId,
        income,
      });
      res.status(200).json({
        data: updatedIncomeId,
        message: "income updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:incomeId", async function (req, res, next) {
    try {
      const { incomeId } = req.params;
      const deletedIncomeId = await incomesService.deleteIncome({
        incomeId,
      });
      res.status(200).json({
        data: deletedIncomeId,
        message: "income deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = incomesApi;
