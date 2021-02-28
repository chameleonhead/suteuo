const users = require("../models/users");
const { notfound } = require("../utils/responseGenerator");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').Handler} Handler
 */

/**
 * ユーザー情報を検索する
 * @param {Request} req
 * @param {Response} res
 */
const getUsers = async (req, res) => {
  const { q } = req.query;
  const result = await users.searchUser(q);
  res.status(200).json({
    success: true,
    ...result,
  });
};

/**
 * ユーザー情報を取得する
 * @param {Request} req
 * @param {Response} res
 */
const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await users.findUserById(userId);
  if (!user) {
    notfound(res, "Specified user not found.");
    return;
  }
  res.status(200).json({ success: true, user, req: req.headers });
};

module.exports = {
  getUser,
  getUsers,
};
