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
  return result.Items.filter(
    (e) => e.Entity.notificationType === notificationType
  )[0].Entity;
};

/**
 * @typedef Notification
 * @param {string} id
 * @param {string} userId
 * @param {string} timestamp
 * @param {string} type
 * @param {string} message
 * @param {boolean} isRead
 */

const createNotification = (userId, type, message) => {
  return {
    id: uuid.v4(),
    userId,
    timestamp: Date.now(),
    type,
    message,
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
  const filtered = result.Items.map((e) => e.Entity);
  return {
    totalCount: filtered.length,
    items: filtered,
  };
};

module.exports = {
  createNotification,
  addNotificationConfig,
  findNotificationConfigByType,
  addNotification,
  findNotificationById,
  searchNotificationsForUser,
  updateNotificationRead: updateNotificationRead,
};
