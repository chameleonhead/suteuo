const notifications = require("../models/notifications");
const { notfound } = require("../utils/responseGenerator");
const uuid = require("uuid");
const { getUserId } = require("../utils/helpers");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').Handler} Handler
 */

/**
 * WEB通知の設定を登録する
 * @param {Request} req
 * @param {Response} res
 */
const putWebPushNotificationConfig = async (req, res) => {
  const config = await notifications.findNotificationConfigByType("webpush");
  if (config) {
    await notifications.updateNotificationConfig({ ...config, data: req.body });
  } else {
    await notifications.addNotificationConfig({
      id: uuid.v4(),
      notificationType: "webpush",
      data: req.body,
    });
  }
  return res.status(200).json({
    success: true,
  });
};

/**
 * WEB通知の設定を取得する
 * @param {Request} req
 * @param {Response} res
 */
const getWebPushNotificationConfig = async (req, res) => {
  const config = await notifications.findNotificationConfigByType("webpush");
  if (!config) {
    notfound(res, "Web push config has not been set.");
    return;
  }
  return res.status(200).json({
    success: true,
    config: config.data,
  });
};

/**
 * 通知一覧を取得する
 * @param {Request} req
 * @param {Response} res
 */
const getNotifications = async (req, res) => {
  const userId = getUserId(req);
  const result = await notifications.searchNotificationsForUser(userId);
  return res.status(200).json({
    success: true,
    ...result,
  });
};

/**
 * 通知に既読をセットする
 * @param {Request} req
 * @param {Response} res
 */
const postNotificationsRead = async (req, res) => {
  const userId = getUserId(req);
  let notificationIds = req.body.notificationId
    ? [req.body.notificationId]
    : [];
  if (req.body.notificationIds) {
    notificationIds = notificationIds.concat(req.body.notificationIds);
  }
  await notifications.updateNotificationsRead(userId, notificationIds);
  return res.status(200).json({
    success: true,
  });
};

module.exports = {
  getWebPushNotificationConfig,
  putWebPushNotificationConfig,
  getNotifications,
  postNotificationsRead,
};
