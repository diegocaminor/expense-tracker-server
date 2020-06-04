const express = require("express");
const { mockDocument } = require("../utils/mocks/mock");

// Routes that are responsible for communicating with the incomes services
function incomesApi(app) {
  const router = express.Router();
  app.use("/api/incomes", router);

  router.get("/", async function (req, res, next) {
    try {
      const incomes = await Promise.resolve(mockDocument);
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
      const income = await Promise.resolve(mockDocument[0]);
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
      console.log("ñañaññaña");
      console.log(income);
      const createdIncomeId = await Promise.resolve(mockDocument[0]._id);
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
      const updatedIncomeId = await Promise.resolve(mockDocument[0]._id);
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
      const deletedIncomeId = await Promise.resolve(mockDocument[0]._id);
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
