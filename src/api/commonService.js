const usersSchema = require("../models/users");
const config = require("../config/config.json");
const jwt = require("jsonwebtoken");
module.exports = () => {
  return {
    registrationParams: (body) => {
      if (body.phoneNumber && body.email && body.userName && body.password)
        return true;
      return false;
    },

    loginParams: (body) => {
      if (body.email && body.password) return true;
      return false;
    },

    forgotPasswordParams: (body) => {
      if (body.oldPassword && body.newPassword && body.confirmPassword)
        return true;
      return false;
    },

    verifyEmail: async (email) => {
      const query = { email: email };
      // const data = await usersSchema.find(query);
      const data = await usersSchema.aggregate([
        {
          $match: {
            $or: [{ email: email }, { phoneNumber: email }],
          },
        },
      ]);
      return data;
    },

    generateJwtToken: async (userId) => {
      const token = jwt.sign({ userId }, config.JWT.secretKey);
      return token;
    },
  };
};
