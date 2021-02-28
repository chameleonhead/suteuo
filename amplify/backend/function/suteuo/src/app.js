var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

if (process.env.ENDPOINT_OVERRIDE) {
  const expressJSDocSwagger = require("express-jsdoc-swagger");
  //swaggerの基本定義
  const options = {
    info: {
      version: "1.0.0",
      title: "Suteuo API",
      description: "捨魚のAPI仕様",
      license: {
        name: "MIT",
      },
    },
    filesPattern: "./**/*.js", // Glob pattern to find your jsdoc files (it supports arrays too ['./**/*.controller.js', './**/*.route.js'])
    swaggerUIPath: "/api-docs", // SwaggerUI will be render in this url. Default: '/api-docs'
    baseDir: __dirname,
    exposeSwaggerUI: false, // Expose OpenAPI UI. Default true
    exposeApiDocs: true, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
    apiDocsPath: "/api-docs.json", // Open API JSON Docs endpoint. Default value '/v3/api-docs'.
  };

  expressJSDocSwagger(app)(options);
}

function asyncHandler(fn) {
  return (req, res) => {
    return Promise.resolve(fn(req, res)).catch((error) => {
      res.status(500);
      res.json({
        statusCode: 500,
        code: "UnknownException",
        message: "Error occured while accessing database.",
        error: error,
      });
    });
  };
}

/*
 * Suteuo API
 */

var users = require("./controllers/users");
var messaging = require("./controllers/messaging");

/**
 * GET /users
 * @summary ユーザーの一覧を取得する
 * @param {string} q.query - 検索条件
 * @return {object} 200 - 正常
 */
app.get("/users", asyncHandler(users.getUsers));

/**
 * GET /users/{userId}
 * @summary 指定したユーザーの情報を取得する
 * @param {string} userId.path.required - ユーザーID
 * @return {object} 200 - 正常
 */
app.get("/users/:userId", asyncHandler(users.getUser));

/**
 * GET /messaging/rooms
 * @summary メッセージルーム内のメッセージ一覧を取得する
 * @return {object} 200 - success response
 */
app.get("/messaging/rooms", asyncHandler(messaging.getMessageRooms));

/**
 * GET /messaging/rooms/{roomId}
 * @summary メッセージルーム内のメッセージ一覧を取得する
 * @param {string} roomId.path.required - メッセージルームID
 * @return {object} 200 - success response
 */
app.get("/messaging/rooms/:roomId", asyncHandler(messaging.getMessageRooms));

/**
 * POST /messaging/rooms
 * @summary メッセージルームを作成する
 * @return {object} 200 - success response
 */
app.post("/messaging/rooms", asyncHandler(messaging.postMessageRoom));

/**
 * GET /messaging/rooms/{roomId}/messages
 * @summary メッセージルーム内のメッセージを取得する
 * @param {string} roomId.path.required - メッセージルームID
 * @return {object} 200 - success response
 */
app.get(
  "/messaging/rooms/:roomId/messages",
  asyncHandler(messaging.getMessageRoomMessages)
);

/**
 * メッセージ
 * @typedef {object} PostMessageOptions
 * @property {string} body.required - メッセージ本文
 */
/**
 * POST /messaging/rooms/{roomId}/messages
 * @summary メッセージルームにメッセージを投稿する
 * @param {string} roomId.path.required - メッセージルームID
 * @param {PostMessageOptions} request.body.required - メッセージ
 * @return {object} 200 - success response
 */
app.post(
  "/messaging/rooms/:roomId/messages",
  asyncHandler(messaging.postMessageRoomMessage)
);

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
