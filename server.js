const express = require("express");
const app = express();
const router = require("express").Router();
const mongoose = require("mongoose");
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

http.listen(port, () => console.log("Application running on port 3000"));
app.use(router);
require("./src/routes/routes.js")(app, router);
