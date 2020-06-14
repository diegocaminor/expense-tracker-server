const express = require("express");
const passport = require("passport");
const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const UsersService = require("../services/users");
const chalk = require("chalk");

const { config } = require("../config");

const THIRTY_DAYS_IN_MS = 2592000; // 30 days in milliseconds
const TWO_HOURS_IN_MS = 7200000; // 2 hours in milliseconds

// Basic strategy
require("../utils/auth/strategies/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);
  const usersService = new UsersService();

  router.post("/sign-in", async function (req, res, next) {
    const { rememberMe } = req.body;
    passport.authenticate("basic", function (err, user) {
      try {
        if (err || !user) {
          next(Boom.unauthorized());
        }
        req.login(user, { session: false }, async function (err) {
          if (err) {
            next(err);
          }
          const { _id: id, userName, email } = user;
          const payload = {
            sub: id,
            userName,
            email,
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: "24h",
          });
          // if rememberMe is true, then the token will expire in 30 days
          res.cookie("token", token, {
            httpOnly: !config.dev,
            secure: !config.dev,
            // maxAge: rememberMe ? THIRTY_DAYS_IN_MS : TWO_HOURS_IN_MS,
          });

          return res.status(200).json({ token, user: { id, userName, email } });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.post("/sign-up", async function (req, res, next) {
    try {
      const { body: user } = req;
      console.log(user);
      const createdUserId = await usersService.createUser({
        user,
      });
      res.status(201).json({
        data: createdUserId,
        message: "user created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/sign-provider", async function (req, res, next) {
    try {
      const { body: user } = req;
      const queriedUser = await usersService.getOrCreateUser({ user });
      const { _id: id, userName, email } = queriedUser;
      const payload = {
        sub: id,
        userName,
        email,
      };
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: "60m",
      });
      return res.status(200).json({ token, user: { id, userName, email } });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = authApi;
