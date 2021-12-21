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

    validateEmail: (email) => {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email)) ? true : false;
    },

    verifyEmail: async (email) => {
      const query = { email: email };
      const data = await usersSchema.find(query);
      return data;
    },

    generateJwtToken: async (userId) => {
      const token = jwt.sign({ userId }, config.JWT.secretKey);
      return token;
    },
  };
};
