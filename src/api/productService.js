const productsSchema = require("../models/products");
module.exports = (config) => {
  const commonService = require("./commonService")();
  return {
    addProducts: async (req, res) => {
      try {
        const validateParams = await commonService.addProductsParams(req.body);
        if (!validateParams) {
          return res.status(400).json({
            status: false,
            data: {},
            message: config.messages.invalidParams,
          });
        }
        const data = {
          productName: req.body.productName,
          price: req.body.price,
          quantity: req.body.quantity,
          category: req.body.category,
        };
        const productsModel = await new productsSchema(data);
        await productsModel.save();
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

    updateProducts: async(req,res)=>{
        try{

        }catch(e){
            
        }
    }
  };
};
