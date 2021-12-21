const { strict } = require("assert");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    userName: String,
    phoneNumber: String,
    email: {
      type: String,
      lowercase: true,
    },
    password: String,
    highestQualification: String,
    school_or_college: String,
    previousCompany: String,
    companyName: String,
    domain: String,
    startDate: Date,
    endDate: Date, 
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    restrict: true,
    minimize: false,
    collection: "users",
  }
);

module.exports = mongoose.model("users", usersSchema);
