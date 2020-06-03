const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining schema of 'Expenses' collection
let expenseSchema = new Schema({
  userId: Schema.Types.ObjectId,
  amount: Number,
  category: {
    _id: Schema.Types.ObjectId,
    name: String,
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

let Expense = mongoose.model("Expenses", expenseSchema);

module.exports = Expense;
