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
}

module.exports = expensesApi;
