const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining schema of 'Expenses' collection
let expenseSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: "User" },
  amount: Number,
  category: {
    categoryId: { type: Schema.ObjectId, ref: "Category" },
    name: { type: String },
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

let Expense = mongoose.model("Expenses", expenseSchema);

module.exports = Expense;
