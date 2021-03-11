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

module.exports = {
  asyncHandler,
};
