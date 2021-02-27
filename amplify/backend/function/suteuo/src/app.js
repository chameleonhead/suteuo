var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

var Bus = require("./bus");
var eventMessageHandler = require("./busEventHandler");
var notificationMessageHandler = require("./busNotificationHandler");
var bus = new Bus();
bus.subscribe(eventMessageHandler);
bus.subscribe(notificationMessageHandler);

var UsersApi = require("./usersApi");
const usersApi = new UsersApi(bus);

var MessagingApi = require("./messagingApi");
const messagingApi = new MessagingApi(bus);

if (process.env.ENDPOINT_OVERRIDE) {
  //swaggerの基本定義
  var options = {
    swaggerDefinition: {
      info: {
        title: "suteuousers",
        version: "1.0.0.",
      },
    },
    apis: [__filename],
  };

  var swaggerJSDoc = require("swagger-jsdoc");
  var swaggerSpec = swaggerJSDoc(options);

  //swagger-ui向けにjsonを返すAPI
  app.get("/api-docs.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

function handleError(res, error) {
  res.status(500);
  res.json({
    statusCode: 500,
    code: "UnknownException",
    message: "Error occured while accessing database.",
    error: error,
  });
}

app.get("/users/:userId", async function (req, res) {
  try {
    const result = await usersApi.getUser(req.params.userId);
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/users", async function (req, res) {
  try {
    const result = await usersApi.updateUser({
      userId: req.body.userId,
      area: req.body.area,
      username: req.body.username,
      nickname: req.body.nickname,
    });
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @openapi
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
 *             totalCount:
 *               type: number
 *               description: 全体件数
 */
app.get("/messaging", async function (req, res) {
  try {
    const result = await messagingApi.getMessagesForRoom("room-1");
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @openapi
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
  try {
    const roomResult = await messagingApi.getRoom("room-1");
    if (roomResult.code === "NotFoundException") {
      await usersApi.createRoom({
        roomId: "room-1",
        creator: "user-1",
        participants: ["user-1", "user-2"],
      });
    }
    const params = {
      roomId: "room-1",
      body: req.body.body,
    };
    const result = await messagingApi.createMessage(params);
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
