const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const Boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const UsersService = require("../../../services/users");

passport.use(
  new BasicStrategy(async function (email, password, next) {
    const usersService = new UsersService();

    try {
      const query = { email };
      const user = await usersService.getUsers({ query });

      if (!user) {
        return next(Boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user[0].password))) {
        return next(Boom.unauthorized(), false);
      }
      delete user[0].password;
      return next(null, user[0]);
    } catch (err) {
      return next(err);
    }
  })
);
