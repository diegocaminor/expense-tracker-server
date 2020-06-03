const express = require("express");
const { mockDocument } = require("../utils/mocks/mock");

function expensesApi(app) {
  const router = express.Router();
  app.use("/api/expenses", router);

  router.get("/", async function (req, res, next) {
    try {
      const expenses = await Promise.resolve(mockDocument);
      res.status(200).json({
        data: expenses,
        message: "expenses listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:expenseId", async function (req, res, next) {
    try {
      const expense = await Promise.resolve(mockDocument[0]);
      res.status(200).json({
        data: expense,
        message: "expense retrieve",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      const createdExpenseId = await Promise.resolve(mockDocument[0]._id);
      res.status(201).json({
        data: createdExpenseId,
        message: "expense created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:expenseId", async function (req, res, next) {
    try {
      const updatedExpenseId = await Promise.resolve(mockDocument[0]._id);
      res.status(200).json({
        data: updatedExpenseId,
        message: "expense updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:expenseId", async function (req, res, next) {
    try {
      const deletedExpenseId = await Promise.resolve(mockDocument[0]._id);
      res.status(200).json({
        data: deletedExpenseId,
        message: "expense deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = expensesApi;
