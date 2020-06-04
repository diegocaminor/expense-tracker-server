const IncomeModel = require("../models/income");
const MongoLib = require("../lib/mongo");

class IncomesService {
  constructor() {
    (this.model = IncomeModel), (this.mongoose = new MongoLib());
  }

  async getIncomes() {
    const query = {};
    const incomes = await this.mongoose.getAll(this.model, query);
    return incomes || [];
  }

  async getIncome({ incomeId }) {
    const income = await this.mongoose.get(this.model, incomeId);
    return income || [];
  }

  async createIncome({ income }) {
    const createdIncomeId = await this.mongoose.create(this.model, income);
    return createdIncomeId || [];
  }

  async updateIncome({ incomeId, income }) {
    const updatedIncomeId = await this.mongoose.update(
      this.model,
      incomeId,
      income
    );
    return updatedIncomeId || [];
  }

  async deleteIncome({ incomeId }) {
    const deletedIncomeId = await this.mongoose.delete(this.model, incomeId);
    return deletedIncomeId || [];
  }
}

module.exports = IncomesService;
