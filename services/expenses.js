const ExpenseModel = require("../models/expense");
const MongoLib = require("../lib/mongo");
const chalk = require("chalk");
class ExpensesService {
  constructor() {
    (this.model = ExpenseModel), (this.mongoose = new MongoLib());
  }

  async getExpenses({ query }) {
    const expenses = await this.mongoose.getAll(this.model, query);
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
