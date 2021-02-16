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
  // 開発時のみの設定
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
 *         description: 正常終了
 *         headers:
 *           Link:
 *             example: <https://api.github.com/resource?page=2>; rel="next", <https://api.github.com/resource?page=5>; rel="last"
 *             schema:
 *               type: string
 *         schema:
 *           type: object
 *           properties:
 *             messages:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   messageId:
 *                     type: string
 *                   body:
 *                     type: string
 *                   sender:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *               description: メッセージ一覧
 *             total_count:
 *               type: number
 *               description: 全体件数
 */
app.get("/messaging", async function (req, res) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
  };
  try {
    const result = await docClient.scan(params).promise();
    res.json({
      messages: result.Items.map((item) => ({
        messageId: item.PK,
        body: item.Body,
        sender: item.Sender,
        createdAt: item.CreatedAt,
      })),
    });
  } catch (error) {
    res.status(500);
    res.json({
      statusCode: 500,
      code: "UnknownException",
      message: "Error occured while accessing database.",
      error: error,
    });
  }
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
 *       - in: body
 *         name: message
 *         description: メッセージ内容
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - body
 *           properties:
 *             body:
 *               type: string
 *               description: メッセージ本文
 *     responses:
 *       200:
 *         description: 正常終了
 *         schema:
 *           type: object
 *           properties:
 *             messageId:
 *               type: string
 *               description: 生成されたキー
 *       400:
 *         description: BadRequest
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               description: エラーコード
 *             message:
 *               type: string
 *               description: エラーメッセージ
 */
app.post("/messaging", async function (req, res) {
  if (!req.body.body) {
    res.status(400);
    res.json({
      statusCode: 400,
      code: "ValidationException",
      message: "message body is empty.",
      time: new Date().toISOString(),
      retryable: false,
    });
    return;
  }
  const key = id();
  const params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    Item: {
      PK: key,
      SK: "MESSAGE",
      Body: req.body.body,
      Sender: req.body.sender,
      CreatedAt: new Date().toISOString(),
    },
  };
  try {
    await docClient.put(params).promise();
    res.json({ messageId: key });
  } catch (error) {
    res.status(500);
    res.json({
      statusCode: 500,
      code: "UnknownException",
      message: "Error occured while accessing database.",
      error: error,
    });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
