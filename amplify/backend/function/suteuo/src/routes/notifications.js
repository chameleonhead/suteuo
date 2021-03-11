const express = require("express");
const router = express.Router();
const controller = require("../controllers/notifications");
const { asyncHandler } = require("../utils/helpers");

/**
 * GET /notifications/config/webpush
 * @summary Web Push APIの設定を取得する
 * @return {object} 200 - success response
 */
router.get(
  "/notifications/config/webpush",
  asyncHandler(controller.getWebPushNotificationConfig)
);

/**
 * GET /notifications
 * @summary 通知一覧を取得する
 * @return {object} 200 - success response
 */
router.get("/notifications", asyncHandler(controller.getNotifications));

/**
 * 購読
 * @typedef {object} PutSubscriptionOptions
 * @property {string} type.required - 購読タイプ
 * @property {object} data.required - 購読オブジェクト
 */

/**
 * GET /notifications/subscriptions
 * @summary 購読の一覧を取得する
 * @return {object} 200 - success response
 */
router.get(
  "/notifications/subscriptions",
  asyncHandler(controller.getSubscriptions)
);
/**
 * PUT /notifications/subscriptions/{subscriptionKey}
 * @param {string} subscriptionKey.path.required - 購読キー
 * @param {PutSubscriptionOptions} request.body - リクエストボディ
 * @summary 購読を登録する
 * @return {object} 200 - success response
 */
router.put(
  "/notifications/subscriptions/:subscriptionKey",
  asyncHandler(controller.putSubscription)
);

/**
 * DELETE /notifications/subscriptions/{subscriptionKey}
 * @param {string} subscriptionKey.path.required - 購読キー
 * @summary 購読を解除する
 * @return {object} 200 - success response
 */
router.delete(
  "/notifications/subscriptions/:subscriptionKey",
  asyncHandler(controller.deleteSubscription)
);

/**
 * @typedef PostNotificationsOptions
 * @property {string[]} notificationIds
 */
/**
 * POST /notifications/{notificationId}/read
 * @summary 通知を既読に変更する
 * @param {string} notificationId.path.required - 通知ID
 * @param {PostNotificationsOptions} request.body.required
 * @return {object} 200 - success response
 */
router.post(
  "/notifications/:notificationId/read",
  asyncHandler(controller.postNotificationRead)
);

module.exports = router;
