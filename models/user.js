const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining schema of 'Users' collection
let userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: "Email address is required",
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill a valid email address",
    ],
  },
  userName: { type: String, required: "Username is required", unique: true },
  password: String,
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now },
});

let User = mongoose.model("Users", userSchema);

module.exports = User;
