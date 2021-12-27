module.exports = (config, docClient) => {
  const dynamoDbService = require("../api/dynamoDbService")(config, docClient);
  return {
    getTableItems: (req, res, next) => {
      dynamoDbService.getTableItems(req, res, next);
    },
  };
};
