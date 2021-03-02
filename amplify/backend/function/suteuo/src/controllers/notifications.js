const notifications = require("../models/notifications");
const { notfound } = require("../utils/responseGenerator");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').Handler} Handler
 */

/**
 * メッセージルームを検索する
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

module.exports = {
  getWebPushNotificationConfig,
};
