// Import modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const bodyParser = require("body-parser");

// Import routes
const expensesApi = require("./routes/expenses");
const categoriesApi = require("./routes/categories");
const incomesApi = require("./routes/incomes");
const usersApi = require("./routes/users");

// Environment Variables
const { config } = require("./config/index");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Routes
expensesApi(app);
categoriesApi(app);
incomesApi(app);
usersApi(app);

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
