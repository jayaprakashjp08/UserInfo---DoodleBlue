const usersSchema = require("../models/users");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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
          });
        }

        const passwordMatched = bcrypt.compareSync(
          req.body.password,
          userDetails[0].password
        );
        if (passwordMatched) {
          const token = await commonService.generateJwtToken(
            userDetails[0]._id
          );
          return res.status(200).json({
            status: true,
            data: token,
            message: config.messages.loginSuccessful,
          });
        } else {
          return res.status(401).json({
            status: false,
            data: {},
            message: config.messages.invalidPassword,
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: false,
          data: e,
          message: config.messages.internalServerError,
        });
      }
    },

    forgotPassword: async (req, res) => {
      try {
        const validateParams = await commonService.forgotPasswordParams(
          req.body
        );
        if (!validateParams) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.invalidParams,
          });
        }

        const userData = jwt.decode(
          req.headers.token || req.headers["x-access-token"]
        );

        if (req.body.newPassword === req.body.confirmPassword) {
          const saltPassword = bcrypt.hashSync(req.body.newPassword, 10);
          const query = { _id: userData.userId };
          let updateUserDetails = await usersSchema.updateOne(query, {
            $set: {
              password: saltPassword,
            },
          });
          return res.status(200).json({
            status: true,
            data: {},
            message: config.messages.updatedPassword,
          });
        } else {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.passwordShouldMatch,
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: false,
          data: e,
          message: config.messages.internalServerError,
        });
      }
    },

    updateUserProfile: async (req, res) => {
      try {
        const userData = jwt.decode(
          req.headers.token || req.headers["x-access-token"]
        );
        const query = { _id: userData.userId };
        const updateUserProfile = await usersSchema.updateOne(query, {
          $set: req.body,
        });
        return res.status(200).json({
            status: true,
            message: config.messages.profileUpdated,
          });
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
