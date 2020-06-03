// Import modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Environment Variables
const { config } = require("./config/index");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const expensesApi = require("./routes/expenses");
expensesApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
