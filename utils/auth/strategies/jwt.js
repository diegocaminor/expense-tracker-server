const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Boom = require("@hapi/boom");

const UsersService = require("../../../services/users");
const { config } = require("../../../config");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, next) {
      const usersService = new UsersService();
      try {
        const user = await usersService.getUser({ email: tokenPayload.email });
        if (!user) {
          return next(Boom.unauthorized(), false);
        }
        delete user.password;
        next(null, user);
      } catch (err) {
        return next(err);
      }
    }
  )
);
