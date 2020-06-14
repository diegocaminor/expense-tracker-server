const ExpenseModel = require("../models/expense");
const MongoLib = require("../lib/mongo");
var ObjectId = require("mongoose").Types.ObjectId;

class ExpensesService {
  constructor() {
    (this.model = ExpenseModel), (this.mongoose = new MongoLib());
  }

  async getExpenses(userId, queryFilter, queryDate) {
    let isAggregate;
    let query;
    if (
      queryFilter != undefined &&
      queryFilter != "undefined" &&
      queryFilter != "all"
    ) {
      isAggregate = true;
      query = [];
      switch (queryFilter) {
        // List of expenses per user filtered per day
        case "day":
          query.push({
            $match: {
              userId: ObjectId(userId),
              createdAt: new Date(queryDate),
            },
          });
          query.push({ $sort: { createdAt: 1 } });
          break;
        // List of expenses per user filtered per month and year
        case "month":
          const year = parseInt(queryDate.split("-")[0]);
          const month = parseInt(queryDate.split("-")[1]);
          query.push({
            $addFields: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
          });
          query.push({
            $match: { userId: ObjectId(userId), month: month, year: year },
          });
          query.push({ $sort: { createdAt: 1 } });
          break;
        // List of expenses per user filtered per year
        case "year":
          query.push({ $addFields: { year: { $year: "$createdAt" } } });
          query.push({
            $match: {
              userId: ObjectId("5ed9f0c97745d7515f0910b0"),
              year: parseInt(queryDate),
            },
          });
          query.push({ $sort: { createdAt: 1 } });
          break;
        default:
          throw new Error("Invalid filter");
      }
    } else {
      // List of expenses per user
      isAggregate = false;
      query = { userId: ObjectId(userId) };
    }

    const expenses = await this.mongoose.getAll(this.model, query, isAggregate);
    return expenses || [];
  }

  async getExpense({ expenseId }) {
    const expense = await this.mongoose.get(this.model, expenseId);
    return expense || [];
  }

  async createExpense({ expense }) {
    const createdExpenseId = await this.mongoose.create(this.model, expense);
    return createdExpenseId;
  }

  async updateExpense({ expenseId, expense }) {
    const updatedExpenseId = await this.mongoose.update(
      this.model,
      expenseId,
      expense
    );
    return updatedExpenseId;
  }

  async deleteExpense({ expenseId }) {
    const deletedExpenseId = await this.mongoose.delete(this.model, expenseId);
    return deletedExpenseId;
  }
}

module.exports = ExpensesService;
