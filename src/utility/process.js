module.exports = (config) => {
    const userService = require("../api/userService")(config);
  return {
    registration: (req, res, next) => {
      userService.registration(req, res, next);
    },

    doLogin: (req, res, next) => {
      userService.doLogin(req, res, next);
    },
  };
};
