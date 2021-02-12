var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const AWS = require("aws-sdk");
const authClient = new AWS.CognitoIdentityServiceProvider();

app.get("/users/:userId", function (req, res) {
  authClient.adminGetUser(
    {
      UserPoolId: process.env.AUTH_SUTEUO_USERPOOLID,
      Username: req.params.userId,
    },
    function (err, data) {
      if (err) res.json({ err });
      else {
        function findAttr(attrName) {
          const filtered = data.UserAttributes.filter(
            (e) => e.Name === attrName
          );
          return filtered.length ? filtered[0].Value : null;
        }
        const id = findAttr("sub");
        res.json({
          id,
          username: findAttr("username") || id,
          displayName: findAttr("displayName") || id,
          avatarUrl: findAttr("avatar_url"),
          area: findAttr("area"),
          rating: findAttr("rating"),
        });
      }
    }
  );
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
