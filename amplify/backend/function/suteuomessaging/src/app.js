var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const AWS = require("aws-sdk");
if (process.env.ENDPOINT_OVERRIDE) {
  AWS.config.update({
    region: "us-west-2",
    endpoint: process.env.ENDPOINT_OVERRIDE,
    accessKeyId: "fakeAccessKeyId",
    secretAccessKey: "fakeSecretAccessKey",
  });
}
const docClient = new AWS.DynamoDB.DocumentClient();

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

app.get("/messaging", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
  };
  docClient.scan(params, function (err, data) {
    if (err) res.json({ err });
    else res.json(data);
  });
});

app.post("/messaging", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    Item: {
      PK: id(),
      SK: "MESSAGE",
      Body: req.body.body,
      Sender: req.body.sender,
      CreatedAt: req.body.createdAt,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) res.json({ err });
    else res.json({ success: "Message created successfully!" });
  });
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
