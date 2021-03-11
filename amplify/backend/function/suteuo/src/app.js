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

var users = require("./routes/users");
var messaging = require("./routes/messaging");
var notifications = require("./routes/notifications");

app.use(users);
app.use(messaging);
app.use(notifications);

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
