module.exports = (config) => {
  const userService = require("../api/userService")(config);
  const productService = require("../api/productService")(config);
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

    updateUserProfile: (req, res, next) => {
      userService.updateUserProfile(req, res, next);
    },


    addProducts: (req, res, next) => {
      productService.addProducts(req, res, next);
    },
  };
};
