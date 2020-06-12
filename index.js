// Import modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import routes
const authApi = require("./routes/auth");
const expensesApi = require("./routes/expenses");
const categoriesApi = require("./routes/categories");
const incomesApi = require("./routes/incomes");
const usersApi = require("./routes/users");
const notFoundHandler = require("./utils/middleware/notFoundHandler.js");

// Environment Variables
const { config } = require("./config/index");

// Middlewares
app.use(cookieParser());
app.use(cors({ credentials: true, origin: config.clientUrl }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Routes
authApi(app);
expensesApi(app);
categoriesApi(app);
incomesApi(app);
usersApi(app);

// 404 error
app.use(notFoundHandler);

// Error Middlewares
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require("./utils/middleware/errorsHandler.js");
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
