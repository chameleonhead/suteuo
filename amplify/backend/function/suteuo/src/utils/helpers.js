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

const getUserId = (request) => {
  try {
    const reqContext = request.apiGateway.event.requestContext;
    const authProvider = reqContext.identity.cognitoAuthenticationProvider;
    return authProvider
      ? authProvider.split(":CognitoSignIn:").pop()
      : "UNAUTH";
  } catch (error) {
    return "UNAUTH";
  }
};

module.exports = {
  getUserId,
  asyncHandler,
};
