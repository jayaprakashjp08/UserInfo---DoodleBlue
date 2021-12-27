module.exports = (router, docClient) => {
  const config = require("../config/config.json");
  const routes = config.routes;
  const process = require("../utility/process")(config,docClient);

  //user information storing
  router.get(routes.api.getTableItems, process.getTableItems);
  

};
