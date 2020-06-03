const { mockDocument } = require("../utils/mocks/mock");

class ExpensesService {
  async getExpenses() {
    console.log("getExpenses");
    const expenses = await Promise.resolve(mockDocument);
    return expenses || [];
  }

  async getExpense() {
    console.log("getExpense");
    const expense = await Promise.resolve(mockDocument[0]);
    return expense || [];
  }

  async createExpense() {
    console.log("createExpense");
    const createdExpenseId = await Promise.resolve(mockDocument[0]._id);
    return createdExpenseId || [];
  }

  async updateExpense() {
    console.log("createExpense");
    const updatedExpenseId = await Promise.resolve(mockDocument[0]._id);
    return updatedExpenseId || [];
  }

  async deleteExpense() {
    console.log("deleteExpense");
    const deletedExpenseId = await Promise.resolve(mockDocument[0]._id);
    return deletedExpenseId || [];
  }
}

module.exports = ExpensesService;
