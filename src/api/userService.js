const usersSchema = require("../models/users");
const bcrypt = require("bcrypt");
const commonService = require("./commonService");

module.exports = (config) => {
  const commonService = require("./commonService")();
  return {
    registration: async (req, res) => {
      try {
        const validateParams = await commonService.registrationParams(req.body);
        if (!validateParams) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.invalidParams,
          });
        }

        const validateEmail = await commonService.validateEmail(req.body.email);
        if (!validateEmail) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.invalidEmailFormat,
          });
        }

        const userDetails = await commonService.verifyEmail(req.body.email);
        if (userDetails.length) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.alreadyRegistered,
          });
        }
        const saltPassword = bcrypt.hashSync(req.body.password, 10);
        const data = {
          userName: req.body.userName,
          email: req.body.email.toLowerCase(),
          password: saltPassword,
          phoneNumber: req.body.phoneNumber,
        };
        const userModel = await new usersSchema(data);
        const result = await userModel.save();
        if (result) {
          const token = await commonService.generateJwtToken(result._id);
          return res.status(200).json({
            status: true,
            data: {
              token: token,
            },
            message: config.messages.registeredSuccessfully,
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: false,
          data: {},
          message: config.messages.internalServerError,
        });
      }
    },

    doLogin: async (req, res) => {
      try {
        const validateParams = await commonService.loginParams(req.body);
        if (!validateParams) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.invalidParams,
          });
        }

        const validateEmail = await commonService.validateEmail(req.body.email);
        if (!validateEmail) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.invalidEmailFormat,
          });
        }

        const userDetails = await commonService.verifyEmail(req.body.email);
        if (!userDetails.length) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.notRegistered,
          });gbhtrgh
        }

        const passwordMatched = bcrypt.compareSync(password, userDetails[0].password);
        console.log()
      } catch (e) {
        return res.status(500).json({
          status: false,
          data: e,
          message: config.messages.internalServerError,
        });
      }
    },
  };
};
