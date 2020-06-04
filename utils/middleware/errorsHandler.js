// Importing Boom HTTP-friendly error objects
const Boom = require("@hapi/boom");
const { config } = require("../../config");
const chalk = require("chalk");

function withErrorStack(error, stack) {
  // If the application is in development then the error will return the stack too
  if (config.dev) {
    return { error, stack };
  }
  return error;
}
function logErrors(err, req, res, next) {
  console.log(chalk.cyanBright(err));
  next(err);
}

// if error doesn't have a boom structure, then turn into boom structure
function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(Boom.boomify(err));
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
