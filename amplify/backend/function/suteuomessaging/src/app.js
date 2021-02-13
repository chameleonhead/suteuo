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

  //swaggerの基本定義
  var options = {
    swaggerDefinition: {
      info: {
        title: "suteuomessaging",
        version: "1.0.0.",
      },
    },
    apis: ["./app.js"], //自分自身を指定。外部化した場合は、そのファイルを指定。配列で複数指定も可能。
  };

  var swaggerJSDoc = require("swagger-jsdoc");
  var swaggerSpec = swaggerJSDoc(options);

  //swagger-ui向けにjsonを返すAPI
  app.get("/api-docs.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
const docClient = new AWS.DynamoDB.DocumentClient();

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * @swagger
 * /messaging:
 *   get:
 *     description: List messages
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/messaging", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
  };
  docClient.scan(params, function (err, data) {
    if (err) res.json({ err });
    else res.json(data);
  });
});

/**
 * @swagger
 * /messaging:
 *   post:
 *     description: Create message
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Message body.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */
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
