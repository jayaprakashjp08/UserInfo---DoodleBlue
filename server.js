const express = require("express");
const app = express();
const router = require("express").Router();
const mongoose = require("mongoose");
var path = require("path");
const http = require("http").Server(app);
const config = require("./src/config/config.json");
const port = config.port;
var AWS = require("aws-sdk");

AWS.config.update({
  region: config.aws.region,
  // apiVersion: config.aws.apiVersion,
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey,
});

let docClient = new AWS.DynamoDB.DocumentClient();
// let params = {
//   TableName: "Organization",
//   Key: {},
// };

// docClient.get(params, (err, items) => {
//   if (err) { 
//     console.log("Error occurred while getTableItems ", err);
//     res.status(500).json({
//       status: false,
//       data: err,
//     });
//   } else {
//     console.log("Got successfully");
//     res.status(200).json({
//       status: true,
//       data: items,
//     });
//   }
// });

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(require("express").static(path.join(__dirname, "public")));

http.listen(port, () => console.log("Application running on port 8080"));
app.use(router);
require("./src/routes/routes.js")(router, docClient);
