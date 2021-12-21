module.exports = (config) => {
  const userService = require("../api/userService")(config);
  const authentication = require("../api/authentication")(config);
  return {
    registration: (req, res, next) => {
      userService.registration(req, res, next);
    },

    doLogin: (req, res, next) => {
      userService.doLogin(req, res, next);
    },

    forgotPassword: (req, res, next) => {
      userService.forgotPassword(req, res, next);
    },

    verifyUserToken: (req, res, next) => {
      authentication.verifyUserToken(req, res, next);
    },
  };
};
