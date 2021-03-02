const DynamoDb = require("./dynamodb");
const table = new DynamoDb(process.env.STORAGE_SUTEUONOTIFICATIONS_NAME);

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
 * @param {string} message
 * @param {boolean} isRead
 */

/**
 * @param {Notification} notification
 */
const addNotification = async (notification) => {
  await table.add({
    SK: "USER#" + notification.userId,
    PK: "NOTIFICATION#" + notification.id,
    Entity: notification,
  });
};

/**
 *
 * @param {string} userId
 * @param {string[]} notificationIds
 */
const updateNotificationsRead = async (userId, notificationIds) => {
  const result = await table.batchFind(
    notificationIds.map((id) => ({
      PK: "USER#" + userId,
      SK: "NOTIFICATION#" + id,
    }))
  );
  await table.batchUpdate(
    result.Items.map((item) => {
      return {
        type: "UPDATE",
        item: {
          ...item,
          Entity: {
            ...item.Entity,
            isRead: true,
          },
        },
      };
    })
  );
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
  addNotificationConfig,
  findNotificationConfigByType,
  addNotification,
  findNotificationById,
  searchNotificationsForUser,
  updateNotificationsRead,
};
