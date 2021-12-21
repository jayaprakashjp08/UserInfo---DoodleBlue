module.exports = (router) => {
  const config = require("../config/config.json");
  const routes = config.routes;
  const process = require("../utility/process")(config);

  router.post(routes.api.registration, process.registration);
  router.post(routes.api.doLogin, process.doLogin);
};
