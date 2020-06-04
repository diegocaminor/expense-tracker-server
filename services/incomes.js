const { mockDocument } = require("../utils/mocks/mock");

class IncomesService {
  async getIncomes() {
    console.log("getIncomes");
    const incomes = await Promise.resolve(mockDocument);
    return incomes || [];
  }

  async getIncome() {
    console.log("getIncome");
    const income = await Promise.resolve(mockDocument[0]);
    return income || [];
  }

  async createIncome() {
    console.log("createIncome");
    const createdIncomeId = await Promise.resolve(mockDocument[0]._id);
    return createdIncomeId || [];
  }

  async updateIncome() {
    console.log("updateIncome");
    const updatedIncomeId = await Promise.resolve(mockDocument[0]._id);
    return updatedIncomeId || [];
  }

  async deleteIncome() {
    console.log("deleteIncome");
    const deletedIncomeId = await Promise.resolve(mockDocument[0]._id);
    return deletedIncomeId || [];
  }
}

module.exports = IncomesService;
