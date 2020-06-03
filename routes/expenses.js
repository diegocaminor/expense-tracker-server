const express = require("express");
const ExpensesService = require("../services/expenses");

// Routes that are responsible for communicating with the expenses services
function expensesApi(app) {
  const router = express.Router();
  app.use("/api/expenses", router);

  const expensesService = new ExpensesService();

  router.get("/", async function (req, res, next) {
    try {
      const expenses = await expensesService.getExpenses();
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
      const { expenseId } = req.params;
      const expense = await expensesService.getExpense({ expenseId });
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
      const { body: expense } = req;
      const createdExpenseId = await expensesService.createExpense({ expense });
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
      const { expenseId } = req.params;
      const { body: expense } = req;
      const updatedExpenseId = await expensesService.updateExpense({
        expenseId,
        expense,
      });
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
      const { expenseId } = req.params;
      const deletedExpenseId = await await expensesService.deleteExpense({
        expenseId,
      });
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
