const express = require("express");
const passport = require("passport");
var ObjectId = require("mongoose").Types.ObjectId;
const IncomesService = require("../services/incomes");

// JWT Strategy
require("../utils/auth/strategies/jwt");

// Routes that are responsible for communicating with the incomes services
function incomesApi(app) {
  const router = express.Router();
  app.use("/api/incomes", router);
  const incomesService = new IncomesService();

  router.get(
    "/:queryFilter?/:queryDate?",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { queryFilter, queryDate } = req.params; // TODO: research why queryFilter arrives as string
        const { id: userId } = req.cookies;
        const incomes = await incomesService.getIncomes(
          userId,
          queryFilter,
          queryDate
        );
        res.status(200).json({
          data: incomes,
          message: "incomes listed",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/:incomeId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
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
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
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
    }
  );

  router.put(
    "/:incomeId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
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
    }
  );

  router.delete(
    "/:incomeId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
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
    }
  );
}

module.exports = incomesApi;
