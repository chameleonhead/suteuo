const notfound = (res, message) => {
  res.status(404);
  res.json({
    statusCode: 404,
    code: "NotFoundException",
    message: message,
    retryable: false,
  });
};

const notvalid = (res, message) => {
  res.status(400);
  res.json({
    statusCode: 400,
    code: "ValidationException",
    message: message,
    retryable: false,
  });
};

module.exports = {
  notfound,
  notvalid,
};
