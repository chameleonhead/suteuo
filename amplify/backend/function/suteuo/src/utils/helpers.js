async function execute(fn, req, res) {
  try {
    await fn(req, res);
  } catch (error) {
    res.status(500);
    res.json({
      statusCode: 500,
      code: "UnknownException",
      message: "Error occured while accessing database.",
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }
}
function asyncHandler(fn) {
  return (req, res) => {
    return Promise.resolve(execute(fn, req, res));
  };
}

module.exports = {
  asyncHandler,
};
