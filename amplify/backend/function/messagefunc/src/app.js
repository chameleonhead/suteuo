var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

app.get("/messages", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_MESSAGETABLE_NAME,
  };
  docClient.scan(params, function (err, data) {
    if (err) res.json({ err });
    else res.json(data);
  });
});

app.post("/messages", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_MESSAGETABLE_NAME,
    Item: {
      id: id(),
      body: req.body.body,
      sender: req.body.sender,
      createdAt: req.body.createdAt,
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
