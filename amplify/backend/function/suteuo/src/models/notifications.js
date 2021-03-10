const DynamoDb = require("./dynamodb");
const table = new DynamoDb(process.env.STORAGE_SUTEUONOTIFICATION_NAME);
const uuid = require("uuid");

/**
 * @typedef NotificationConfig
 * @property {string} id
 * @property {string} notificationType
 * @property {object} data
 */

/**
 * @param {NotificationConfig} notificationConfig
 * @param {string} loginUserId
 */
const addNotificationConfig = async (notificationConfig, loginUserId) => {
  await table.add(
    {
      PK: "NOTIFICATIONCONFIG#" + notificationConfig.id,
      SK: "NOTIFICATIONCONFIG",
      Entity: notificationConfig,
    },
    loginUserId
  );
};

/**
 * @param {string} notificationType
 * @returns {NotificationConfig}
 */
const findNotificationConfigByType = async (notificationType) => {
  const result = await table.searchSk("NOTIFICATIONCONFIG");
  const config = result.Items.filter(
    (e) => e.Entity.notificationType === notificationType
  )[0];
  return config ? config.Entity : null;
};

/**
 * @typedef Notification
 * @param {string} id
 * @param {string} userId
 * @param {string} timestamp
 * @param {string} type
 * @param {string} message
 * @param {string} data
 * @param {boolean} isRead
 */
const createNotification = (userId, type, data) => {
  return {
    id: uuid.v4(),
    userId,
    timestamp: Date.now(),
    type,
    data,
    isRead: false,
  };
};

/**
 * @param {Notification} notification
 */
const addNotification = async (notification) => {
  await table.add({
    PK: "USER#" + notification.userId,
    SK: "NOTIFICATION#" + notification.id,
    Entity: notification,
  });
};

/**
 *
 * @param {string} userId
 * @param {string} notificationId
 * @param {string} loginUserId
 */
const updateNotificationRead = async (userId, notificationId, loginUserId) => {
  const result = await table.find(
    "USER#" + userId,
    "NOTIFICATION#" + notificationId
  );
  await table.update({
    ...result.Item,
    isRead: true,
  });
};

/**
 * @param {string} notificationId
 * @returns {Notification}}
 */
const findNotificationById = async (userId, notificationId) => {
  const result = await table.find(
    "USER#" + userId,
    "NOTIFICATION#" + notificationId
  );
  return result.Items || null;
};

/**
 * @param {string} userId
 * @returns {{totalCount: number;items: Notification[]}}
 */
const searchNotificationsForUser = async (userId) => {
  const result = await table.searchPk("USER#" + userId);
  const filtered = result.Items.map((e) => e.Entity).filter(
    (e) => !e.Item.isRead
  );
  return {
    totalCount: filtered.length,
    items: filtered,
  };
};

/**
 * @typedef NotificationSubscription
 * @property {string} subscriptionKey
 * @property {string} subscriptionType
 * @property {string} user
 * @property {object} data
 */

/**
 *
 * @param {string} userId
 * @returns {{totalCount: number; items: NotificationSubscription[]}}
 */
const searchSubscriptionsByUser = async (userId) => {
  const result = await table.searchPk("USER#" + userId);
  const items = result.Items.map((item) => item.Entity);
  return {
    totalCount: items.length,
    items,
  };
};

/**
 * @param {string} userId
 * @param {string} subscriptionKey
 * @returns {NotificationSubscription}
 */
const findSubscriptionById = async (userId, subscriptionKey) => {
  const result = await table.find(
    "USER#" + userId,
    "SUBSCRIPTION#" + subscriptionKey
  );
  return result.Item ? result.Item.Entity : null;
};

/**
 * @param {NotificationSubscription} subscription
 * @param {string} loginUserId
 */
const addSubscription = async (subscription, loginUserId) => {
  await table.add(
    {
      PK: "USER#" + subscription.user,
      SK: "SUBSCRIPTION#" + subscription.subscriptionKey,
      Entity: subscription,
    },
    loginUserId
  );
};

/**
 * @param {NotificationSubscription} subscription
 * @param {string} loginUserId
 */
const updateSubscription = async (subscription, loginUserId) => {
  await table.update(
    {
      PK: "USER#" + subscription.user,
      SK: "SUBSCRIPTION#" + subscription.subscriptionKey,
      Entity: subscription,
    },
    loginUserId
  );
};

/**
 * @param {string} userId
 * @param {string} subscriptionKey
 */
const deleteSubscriptionById = async (userId, subscriptionKey) => {
  await table.delete("USER#" + userId, "SUBSCRIPTION#" + subscriptionKey);
};

module.exports = {
  createNotification,
  addNotificationConfig,
  findNotificationConfigByType,
  addNotification,
  findNotificationById,
  searchNotificationsForUser,
  updateNotificationRead,
  searchSubscriptionsByUser,
  findSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscriptionById,
};
