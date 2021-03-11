const express = require("express");
const router = express.Router();
const controller = require("../controllers/messaging");
const { asyncHandler } = require("../utils/helpers");

/**
 *
 */

/**
 * GET /messaging/rooms
 * @summary メッセージルーム内のメッセージ一覧を取得する
 * @return {import('./models/messaging').MessageRoom} 200 - success response
 */
router.get("/messaging/rooms", asyncHandler(controller.getMessageRooms));

/**
 * GET /messaging/rooms/{roomId}
 * @summary メッセージルーム内のメッセージ一覧を取得する
 * @param {string} roomId.path.required - メッセージルームID
 * @return {object} 200 - success response
 */
router.get(
  "/messaging/rooms/:roomId",
  asyncHandler(controller.getMessageRooms)
);

/**
 * メッセージルーム
 * @typedef {object} PostMessageRoomOptions
 * @property {string[]} participants.required - 参加者
 */
/**
 * POST /messaging/rooms
 * @param {PostMessageRoomOptions} request.body.required
 * @summary メッセージルームを作成する
 * @return {object} 200 - success response
 */
router.post("/messaging/rooms", asyncHandler(controller.postMessageRoom));

/**
 * GET /messaging/rooms/{roomId}/messages
 * @summary メッセージルーム内のメッセージを取得する
 * @param {string} roomId.path.required - メッセージルームID
 * @return {object} 200 - success response
 */
router.get(
  "/messaging/rooms/:roomId/messages",
  asyncHandler(controller.getMessageRoomMessages)
);

/**
 * メッセージ
 * @typedef {object} PostMessageOptions
 * @property {string} body.required - メッセージ本文
 */
/**
 * POST /messaging/rooms/{roomId}/messages
 * @summary メッセージルームにメッセージを投稿する
 * @param {string} roomId.path.required - メッセージルームID
 * @param {PostMessageOptions} request.body.required - メッセージ
 * @return {object} 200 - success response
 */
router.post(
  "/messaging/rooms/:roomId/messages",
  asyncHandler(controller.postMessageRoomMessage)
);

module.exports = router;
