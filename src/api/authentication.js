module.exports = function (config) {
  var jwt = require("jsonwebtoken");

  return {
    //Access is restricted for invalid user token
    verifyUserToken: async function (req, res, next) {
      try { 
        var token = req.headers.token || req.headers["x-access-token"];

        if (token !== "" && token !== undefined) {
          const tokenDetails = jwt.decode(token, { complete: true });
          if (!tokenDetails) {
            return res
              .status(419)
              .json({ message: config.messages.tokenExpired });
          } else {
            next();
          }
        } else {
          return res.status(419).json({ message: config.messages.tokenEmpty });
        }
      } catch (e) {
        return res.status(500).json({
          status: false,
          details: {},
          message: config.messages.internalServerError,
        });
      }
    },
  };
};
