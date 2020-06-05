const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const Boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UsersService = require("../../../services/users");

passport.use(new BasicStrategy(async function (email, password, next) {}));
const usersService = new UsersService();
try {
  const user = await usersService.get({ email });
  if (!user) {
    return next(Boom.unauthorized(), false);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(Boom.unauthorized(), false);
  }
  delete user.password;
  return next(null, user);
} catch (err) {
  return next(err);
}
