const notifications = require("../models/notifications");
const { notfound } = require("../utils/responseGenerator");
const uuid = require("uuid");
const { getUserId } = require("../utils/helpers");
const webpush = require("../utils/webpush");

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
  const userId = getUserId(req);
  const config = await notifications.findNotificationConfigByType("webpush");
  if (config) {
    await notifications.updateNotificationConfig(
      { ...config, data: req.body },
      userId
    );
  } else {
    await notifications.addNotificationConfig(
      {
        id: uuid.v4(),
        notificationType: "webpush",
        data: req.body,
      },
      userId
    );
  }
  res.status(200).json({
    success: true,
  });
};

/**
 * WEB通知の設定を取得する
 * @param {Request} req
 * @param {Response} res
 */
const getWebPushNotificationConfig = async (req, res) => {
  let config = await notifications.findNotificationConfigByType("webpush");
  if (!config) {
    config = {
      id: uuid.v4(),
      notificationType: "webpush",
      data: webpush.generateVAPIDKeys(),
    };
    await notifications.addNotificationConfig(config);
  }
  res.status(200).json({
    success: true,
    config: {
      publicKey: config.data.publicKey,
    },
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
  res.status(200).json({
    success: true,
    ...result,
  });
};

/**
 * 通知に既読をセットする
 * @param {Request} req
 * @param {Response} res
 */
const postNotificationRead = async (req, res) => {
  const userId = getUserId(req);
  const { notificationId } = req.params;
  await notifications.updateNotificationRead(userId, notificationId, userId);
  res.status(200).json({
    success: true,
  });
};

const getSubscriptions = async (req, res) => {
  const userId = getUserId(req);
  const result = await notifications.searchSubscriptionsByUser(userId);
  res.status(200).json({
    success: true,
    ...result,
  });
};

const putSubscription = async (req, res) => {
  const userId = getUserId(req);
  const { subscriptionKey } = req.params;
  const subscription = notifications.findSubscriptionById(subscriptionKey);
  if (subscription) {
    await notifications.updateSubscription(
      {
        subscriptionKey: subscriptionKey,
        subscriptionType: req.body.type,
        user: userId,
        data: req.body.data,
      },
      userId
    );
  } else {
    await notifications.addSubscription(
      {
        subscriptionKey: subscriptionKey,
        subscriptionType: req.body.type,
        user: userId,
        data: req.body.data,
      },
      userId
    );
  }
  res.status(200).json({ success: true });
};

const deleteSubscription = async (req, res) => {
  const userId = getUserId();
  const { subscriptionKey } = req.params;
  const subscription = await notifications.findSubscriptionById(
    userId,
    subscriptionKey
  );
  if (!subscription) {
    notfound(res, "Specified subscription not found.");
    return;
  }
  await notifications.deleteSubscriptionById(userId, subscriptionKey);
  res.status(200).json({ success: true });
};

module.exports = {
  getWebPushNotificationConfig,
  putWebPushNotificationConfig,
  getNotifications,
  postNotificationRead,
  getSubscriptions,
  putSubscription,
  deleteSubscription,
};
