const express = require("express");
const router = express.Router();
const controller = require("../controllers/messaging");
const { asyncHandler } = require("../utils/helpers");

/**
 * @typedef {object} MessageRoom
 * @property {string} id
 * @property {array<string>} participants
 * @property {array<Message>} latestMessages
 */

/**
 * @typedef {object} Message
 * @property {string} id
 * @property {string} body
 * @property {string} sender
 */

/**
 * @typedef {object} MessageRoomListResponse
 * @property {boolean} success
 * @property {number} totalCount
 * @property {array<MessageRoom>} items
 */

/**
 * GET /messaging/rooms
 * @summary メッセージルーム内のメッセージ一覧を取得する
 * @return {MessageRoomListResponse} 200 - success response
 */
router.get("/messaging/rooms", asyncHandler(controller.getMessageRooms));

/**
 * @typedef {object} MessageRoomItemResponse
 * @property {MessageRoom} room
 */

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
 * DELETE /messaging/rooms/{roomId}
 * @summary メッセージルームを削除する
 * @param {string} roomId.path.required - メッセージルームID
 * @return {object} 200 - success response
 */
router.delete(
  "/messaging/rooms/:roomId",
  asyncHandler(controller.deleteMessageRoom)
);

/**
 * メッセージ送信
 * @typedef {object} PostMessageOptions
 * @property {array<string>} recipients.required - 送信先
 * @property {string} text.required - 本文
 */

/**
 * POST /messaging/messages
 * @param {PostMessageOptions} request.body.required
 * @summary メッセージを送信する
 * @return {object} 200 - success response
 */
router.post("/messaging/messages", asyncHandler(controller.postMessage));

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

module.exports = router;
