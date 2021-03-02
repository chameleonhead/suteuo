const DynamoDb = require("./dynamodb");
const table = new DynamoDb(process.env.STORAGE_SUTEUONOTIFICATIONS_NAME);

/**
 * @typedef NotificationConfig
 * @property {string} id
 * @property {string} notificationType
 * @property {object} data
 */

/**
 *
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

const findNotificationConfigByType = async (notificationType) => {
  const result = await table.searchSk("NOTIFICATIONCONFIG");
  return result.Items.filter(
    (e) => e.Entity.notificationType === notificationType
  )[0].Entity;
};

module.exports = {
  addNotificationConfig,
  findNotificationConfigByType,
};
