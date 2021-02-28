/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @returns {Request}
 */
const mockRequest = ({ params, body, query } = {}) => {
  const req = {};
  req.params = params || {};
  req.body = body || {};
  req.query = query || {};
  return req;
};

/**
 * @return {Response}
 */
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

module.exports = {
  mockRequest,
  mockResponse,
};
