const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { asyncHandler } = require("../utils/helpers");

/**
 * GET /users
 * @summary ユーザーの一覧を取得する
 * @param {string} q.query - 検索条件
 * @return {object} 200 - 正常
 */
router.get("/users", asyncHandler(controller.getUsers));

/**
 * GET /users/{userId}
 * @summary 指定したユーザーの情報を取得する
 * @param {string} userId.path.required - ユーザーID
 * @return {object} 200 - 正常
 */
router.get("/users/:userId", asyncHandler(controller.getUser));

module.exports = router;
