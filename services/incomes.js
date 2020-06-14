const IncomeModel = require("../models/income");
const MongoLib = require("../lib/mongo");
var ObjectId = require("mongoose").Types.ObjectId;

class IncomesService {
  constructor() {
    (this.model = IncomeModel), (this.mongoose = new MongoLib());
  }

  async getIncomes(req) {
    const { queryFilter, queryDate } = req.params; // TODO: research why queryFilter arrives as string
    const { id: userId } = req.cookies;

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
        // List of incomes per user filtered per day
        case "day":
          query.push({
            $match: {
              userId: ObjectId(userId),
              createdAt: new Date(queryDate),
            },
          });
          query.push({ $sort: { createdAt: 1 } });
          break;
        // List of incomes per user filtered per month and year
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
        // List of incomes per user filtered per year
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
      // List of incomes per user
      isAggregate = false;
      query = { userId: ObjectId(userId) };
    }

    const incomes = await this.mongoose.getAll(this.model, query, isAggregate);
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
