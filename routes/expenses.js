const express = require("express");
const passport = require("passport");
var ObjectId = require("mongoose").Types.ObjectId;
const ExpensesService = require("../services/expenses");

// JWT Strategy
require("../utils/auth/strategies/jwt");

// Routes that are responsible for communicating with the expenses services
function expensesApi(app) {
  const router = express.Router();
  app.use("/api/expenses", router);

  const expensesService = new ExpensesService();

  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { id: userId } = req.cookies;
        const query = { userId: ObjectId(userId) };
        const expenses = await expensesService.getExpenses({ query });
        res.status(200).json({
          data: expenses,
          message: "expenses listed",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/:expenseId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { expenseId } = req.params;
        if (!ObjectId.isValid(expenseId)) throw new Error("Invalid id");
        const expense = await expensesService.getExpense({ expenseId });
        res.status(200).json({
          data: expense,
          message: "expense retrieve",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { body: expense } = req;
        const createdExpenseId = await expensesService.createExpense({
          expense,
        });
        res.status(201).json({
          data: createdExpenseId,
          message: "expense created",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:expenseId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
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
    }
  );

  router.delete(
    "/:expenseId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
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
    }
  );
}

module.exports = expensesApi;
