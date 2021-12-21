const express = require("express");
const app = express();
const router = require("express").Router();
const mongoose = require("mongoose");
var path = require("path");
const http = require("http").Server(app);
const config = require("./src/config/config.json");
const port = config.port;
const mongoDb = config.database.uri;

mongoose.connect(
  mongoDb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log("Error on database connection");
    } else {
      console.log("Database connected successfully");
    }
  }
);

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(require("express").static(path.join(__dirname, "public")));

http.listen(port, () => console.log("Application running on port 3000"));
app.use(router);
require("./src/routes/routes.js")(router);
