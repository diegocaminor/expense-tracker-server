const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining schema of 'Incomes' collection
let incomeSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: "User" },
  amount: Number,
  category: {
    categoryId: { type: Schema.ObjectId, ref: "Category" },
    name: { type: String },
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

let Income = mongoose.model("Incomes", incomeSchema);

module.exports = Income;
