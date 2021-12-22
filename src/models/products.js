const { strict } = require("assert");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    productName: String,
    price: Number,
    quantity: String,
    category: String,
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    restrict: true,
    minimize: false,
    collection: "products",
  }
);

module.exports = mongoose.model("products", productsSchema);
