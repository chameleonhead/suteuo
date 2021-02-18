var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

var UsersApi = require("./usersApi");
const api = new UsersApi();

if (process.env.ENDPOINT_OVERRIDE) {
  //swaggerの基本定義
  var options = {
    swaggerDefinition: {
      info: {
        title: "suteuousers",
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
    const user = await api.getUser(req.params.userId);
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/users", async function (req, res) {
  try {
    const result = await api.updateUser({
      userId: req.body.userId,
      area: req.body.area,
      username: req.body.username,
      displayName: req.body.displayName,
    });
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
