const productsSchema = require("../models/products");
module.exports = (config) => {
  const commonService = require("./commonService")();
  return {
    addProducts: async (req, res) => {
      try {
        const data = req.body.data;
        const productsModel = await productsSchema.insertMany(data);
        return res.status(200).json({
          status: true,
          message: config.messages.addedSuccessfully,
        });
      } catch (e) {
        return res.status(500).json({
          status: false,
          data: e,
          message: config.messages.internalServerError,
        });
      }
    },

    updateProducts: async (req, res) => {
      try {
        const query = { _id: req.body._id };
        await productsSchema.updateOne(query, {
          $set: req.body,
        });
        return res.status(200).json({
          status: true,
          message: config.messages.updatedSuccessfully,
        });
      } catch (e) {
        return res.status(500).json({
          status: false,
          data: e,
          message: config.messages.internalServerError,
        });
      }
    },

    productList: async (req, res) => {
      try {
        let data;
        if (req.body._id) {
          data = await productsSchema.find({ _id: req.body._id });
        } else if (req.body.category) {
          data = await productsSchema.aggregate([
            {
              $match: { category: req.body.category },
            },
            {
              $project: { productName: 1, price: 1, quantity: 1, category: 1 },
            },
          ]);
        } else if (req.body.skip && req.body.limit) {
          data = await productsSchema.aggregate([
            {
              $project: { productName: 1, price: 1, quantity: 1, category: 1 },
            },
            {
              $skip: req.body.skip,
            },
            {
              $limit: req.body.limit,
            },
          ]);
        } else {
          data = await productsSchema.aggregate([
            {
              $project: { productName: 1, price: 1, quantity: 1, category: 1 },
            },
          ]);
        }

        res.status(200).json({
          status: true,
          date: data,
        });
      } catch (e) {
        return res.status(500).json({
          status: false,
          data: e,
          message: config.messages.internalServerError,
        });
      }
    },

    deleteProduct: async (req, res) => {
      try {
        const query = { _id: req.body._id };
        await productsSchema.remove(query);
        return res.status(200).json({
          status: true,
          message: config.messages.deletedSuccessfully,
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
