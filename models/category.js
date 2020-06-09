const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining schema of 'Categories' collection
let categorySchema = new Schema({
  name: { type: String, unique: true },
  type: { type: String, enum: ["income", "expense"] },
  createdAt: { type: Date, default: Date.now },
});

let Category = mongoose.model("Categories", categorySchema);

module.exports = Category;
