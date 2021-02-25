const AWS = require("aws-sdk");
if (process.env.ENDPOINT_OVERRIDE) {
  // 開発時のみの設定
  AWS.config.update({
    region: "us-west-2",
    endpoint: process.env.ENDPOINT_OVERRIDE,
    accessKeyId: "fakeAccessKeyId",
    secretAccessKey: "fakeSecretAccessKey",
  });
}
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * @typedef NotificationTarget
 * @property {string} id
 * @property {string} user
 * @property {string} targetName
 * @property {object} preference
 * @property {string} createdAt
 */

/**
 * @typedef Notification
 * @property {string} id
 * @property {object} payload
 * @property {string} isSent
 * @property {string} isRead
 * @property {string} createdAt
 * @property {string} expireAt
 */

const convertNotificationFromDbToModel = (notification) => ({
  id: notification.Id,
  payload: notification.Payload,
  isRead: notification.IsRead,
  isSent: notification.IsSent,
  createdAt: notification.CreatedAt,
  expireAt: notification.ExpireAt,
});

/**
 * @param {string} userId
 * @returns {{totalCount: number; items: Notification[]}}
 */
async function getNotificationsForTarget(targetId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    ExpressionAttributeValues: {
      ":id": "TARGET#" + targetId,
      ":value": "NOTIFICATION#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const result = await docClient.query(params).promise();
  return {
    totalCount: result.Count,
    items: result.Items.map(convertNotificationFromDbToModel),
  };
}

/**
 * @param {string} userId
 * @returns {NotificationTarget[]}
 */
async function getNotificationTargetsByUser(userId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    ExpressionAttributeValues: {
      ":id": "USER#" + userId,
      ":value": "TARGET#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const result = await docClient.query(params).promise();
  return result.Items.map((item) => ({
    id: item.Id,
    user: item.User,
    targetName: item.TargetName,
    preference: item.Preference,
    createdAt: item.CreatedAt,
  }));
}

/**
 * @param {NotificationTarget} target
 */
async function addNotificationTarget(target) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Item: {
      PK: "USER#" + target.user,
      SK: "TARGET#" + target.id,
      Id: target.id,
      User: target.user,
      TargetName: target.targetName,
      Preference: target.preference,
      CreatedAt: target.createdAt,
      Creator: target.creator,
    },
  };
  await docClient.put(params).promise();
}

/**
 * @param {string} targetId
 */
async function removeNotificationTarget(targetId) {
  const deleteList = [];
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    FilterExpression: "SK = :sk",
    ExpressionAttributeValues: {
      ":sk": "TARGET#" + targetId,
    },
  };
  const result = await docClient.scan(params).promise();
  for (let item of result.Items) {
    deleteList.push({
      DeleteRequest: {
        Key: {
          PK: item.PK,
          SK: item.SK,
        },
      },
    });
  }

  var notificationParams = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    ExpressionAttributeValues: {
      ":id": "TARGET#" + targetId,
      ":value": "NOTIFICATION#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const notificationResult = await docClient
    .query(notificationParams)
    .promise();
  for (let item of notificationResult.Items) {
    deleteList.push({
      DeleteRequest: {
        Key: {
          PK: item.PK,
          SK: item.SK,
        },
      },
    });
  }
  if (deleteList.length === 0) {
    return;
  }

  await docClient
    .batchWrite({
      RequestItems: {
        [process.env.STORAGE_SUTEUONOTIFICATION_NAME]: deleteList,
      },
    })
    .promise();
}

/**
 * @param {string} targetId
 * @param {Notification} notification
 */
async function addNotification(targetId, notification) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Item: {
      PK: "TARGET#" + targetId,
      SK: "NOTIFICATION#" + notification.id,
      Id: notification.id,
      Payload: notification.payload,
      IsSent: notification.isSent,
      IsRead: notification.isRead,
      CreatedAt: notification.createdAt,
      ExpireAt: notification.expireAt,
    },
  };
  await docClient.put(params).promise();
}

/**
 * @param {string} notificationId
 */
async function updateNotificationSent(notificationId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Item: {
      SK: "NOTIFICATION#" + notificationId,
    },
  };
  const result = await docClient.scan(params).promise();
  await docClient.update({
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Key: {
      PK: result.Items[0].PK,
      SK: result.Items[0].SK,
    },
    AttributeUpdates: {
      IsSent: {
        Action: "PUT",
        Value: true,
      },
    },
  });
}

/**
 * @param {string} notificationId
 */
async function updateNotificationRead(notificationId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Item: {
      SK: "NOTIFICATION#" + notificationId,
    },
  };
  const result = await docClient.scan(params).promise();
  await docClient.update({
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Key: {
      PK: result.Items[0].PK,
      SK: result.Items[0].SK,
    },
    AttributeUpdates: {
      IsRead: {
        Action: "PUT",
        Value: true,
      },
    },
  });
}

/**
 * @param {string} notificationId
 */
async function removeNotification(notificationId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Item: {
      SK: "NOTIFICATION#" + notificationId,
    },
  };
  const result = await docClient.scan(params).promise();
  await docClient
    .delete({
      TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
      Key: {
        PK: result.Items[0].PK,
        SK: result.Items[0].SK,
      },
    })
    .promise();
}

module.exports = {
  getNotificationsForTarget,
  getNotificationTargetsByUser,
  addNotificationTarget,
  removeNotificationTarget,
  addNotification,
  updateNotificationSent,
  updateNotificationRead,
  removeNotification,
};
