// Import modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Import routes
const expensesApi = require("./routes/expenses");
const categoriesApi = require("./routes/categories");
const incomesApi = require("./routes/incomes");

// Environment Variables
const { config } = require("./config/index");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
expensesApi(app);
categoriesApi(app);
incomesApi(app);

// Error Middlewares
const {
  logErrors,
  errorHandler,
} = require("./utils/middleware/errorsHandler.js");
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
