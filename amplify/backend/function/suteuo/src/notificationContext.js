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
 * @typedef Subscription
 * @property {string} id
 * @property {string} user
 * @property {string} clientInfo
 * @property {object} data
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
 * @param {string} subscriptionId
 * @returns {Subscription}
 */
async function getSubscription(subscriptionId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    FilterExpression: "SK = :sk",
    ExpressionAttributeValues: {
      ":sk": "SUBSCRIPTION#" + subscriptionId,
    },
  };

  const result = await docClient.scan(params).promise();
  if (result.Items.length === 0) {
    return null;
  }
  return {
    id: result.Items[0].Id,
    user: result.Items[0].User,
    clientInfo: result.Items[0].ClientInfo,
    data: result.Items[0].Data,
    createdAt: result.Items[0].CreatedAt,
  };
}

/**
 * @param {string} userId
 * @returns {{totalCount: number; items: Notification[]}}
 */
async function getNotificationsForSubscription(subscriptionId, notDeliveredOnly) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    ExpressionAttributeValues: {
      ":id": "SUBSCRIPTION#" + subscriptionId,
      ":value": "NOTIFICATION#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const result = await docClient.query(params).promise();
  if (notDeliveredOnly) {
    return {
      totalCount: result.Count,
      items: result.Items.map(convertNotificationFromDbToModel).filter(
        (e) => !e.isSent
      ),
    };
  } else {
    return {
      totalCount: result.Count,
      items: result.Items.map(convertNotificationFromDbToModel),
    };
  }
}

/**
 * @param {string} userId
 * @returns {Subscription[]}
 */
async function getSubscriptionsForUser(userId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    ExpressionAttributeValues: {
      ":id": "USER#" + userId,
      ":value": "SUBSCRIPTION#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const result = await docClient.query(params).promise();
  return result.Items.map((item) => ({
    id: item.Id,
    user: item.User,
    subscriptionName: item.TargetName,
    data: item.Data,
    createdAt: item.CreatedAt,
  }));
}

/**
 * @param {Subscription} subscription
 */
async function addSubscription(subscription) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Item: {
      PK: "USER#" + subscription.user,
      SK: "SUBSCRIPTION#" + subscription.id,
      Id: subscription.id,
      User: subscription.user,
      ClientInfo: subscription.clientInfo,
      Data: subscription.data,
      CreatedAt: subscription.createdAt,
      Creator: subscription.creator,
    },
  };
  await docClient.put(params).promise();
}

/**
 * @param {string} subscriptionId
 */
async function removeSubscription(subscriptionId) {
  const deleteList = [];
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    FilterExpression: "SK = :sk",
    ExpressionAttributeValues: {
      ":sk": "SUBSCRIPTION#" + subscriptionId,
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
      ":id": "SUBSCRIPTION#" + subscriptionId,
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
 * @param {string} subscriptionId
 * @param {Notification} notification
 */
async function addNotification(subscriptionId, notification) {
  var params = {
    TableName: process.env.STORAGE_SUTEUONOTIFICATION_NAME,
    Item: {
      PK: "SUBSCRIPTION#" + subscriptionId,
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
  getSubscription,
  getNotificationsForSubscription,
  getSubscriptionsForUser,
  addSubscription,
  removeSubscription,
  addNotification,
  updateNotificationSent,
  updateNotificationRead,
  removeNotification,
};
