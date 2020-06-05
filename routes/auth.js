const express = require("express");
const passport = require("passport");
const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

const { config } = require("../config");

require("../utils/auth/strategies/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  router.post("/sign-in", async function (req, res, next) {
    passport.authenticate("basic", function (err, user) {
      try {
        if (err || !user) {
          next(Boom.unauthorized());
        }
        req.login(user, { session: false }, async function (err) {
          if (err) {
            next(err);
          }
          const { _id: id, name, email } = user;
          const payload = {
            sub: id,
            name,
            email,
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: "60m",
          });
          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });
}

module.exports = authApi;
