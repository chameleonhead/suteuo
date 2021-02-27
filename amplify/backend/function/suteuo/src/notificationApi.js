const awsContext = require("./notificationContext");
const uuid = require("uuid");

/**
 * @constructor
 * @param {import('./bus')} bus
 * @param {awsContext} context
 */
function NotificationApi(bus, context) {
  this.bus = bus;
  this.context = context || awsContext;
}

/**
 * @param {string} userId
 */
NotificationApi.prototype.getSubscription = async function (subscriptionId) {
  const subscription = await this.context.getSubscription(subscriptionId);
  if (!subscription) {
    return {
      statusCode: 404,
      code: "NotFoundException",
      message: "Subscription not found.",
    };
  }
  return {
    success: true,
    subscription,
  };
};

/**
 * @param {string} subscriptionId
 */
NotificationApi.prototype.getNotificationsForSubscription = async function (
  subscriptionId
) {
  const subscription = await this.context.getSubscription(subscriptionId);
  if (!subscription) {
    return {
      statusCode: 404,
      code: "NotFoundException",
      message: "Subscription not found.",
    };
  }
  const notifications = await this.context.getNotificationsForSubscription(
    subscriptionId
  );
  return {
    success: true,
    totalCount: notifications.totalCount,
    notifications: notifications.items,
  };
};

/**
 * @param {string} userId
 */
NotificationApi.prototype.getSubscriptionForUser = async function (userId) {
  const subscriptions = await this.context.getSubscriptionsForUser(
    userId,
    false
  );
  return {
    success: true,
    totalCount: subscriptions.totalCount,
    subscriptions: subscriptions.subscriptions,
  };
};

/**
 * @typedef CreateSubscriptionOptions
 * @property {string} type
 * @property {string} user
 * @property {string} clientInfo
 * @property {string} data
 */
/**
 * @param {CreateSubscriptionOptions} options
 */
NotificationApi.prototype.createSubscription = async function (options) {
  const subscriptionId = uuid.v4();
  const subscription = {
    id: subscriptionId,
    type: options.type,
    user: options.user,
    clientInfo: options.clientInfo,
    data: options.data,
    createdAt: new Date().toISOString(),
  };
  await this.context.addSubscription(subscription);
  await this.bus.publish(
    "EVENT:SUBSCRIPTION:CREATED",
    subscriptionId,
    subscription
  );
  return {
    success: true,
    subscription: {
      id: subscriptionId,
    },
  };
};

/**
 * @typedef CreateNotificationOptions
 * @property {string} type
 * @property {string} payload
 * @property {string|undefined} expireAt
 */
/**
 * @param {string} subscriptionId
 * @param {CreateNotificationOptions} options
 */
NotificationApi.prototype.createNotification = async function (
  subscriptionId,
  options
) {
  const subscription = await this.context.getSubscription(subscriptionId);
  if (!subscription) {
    return {
      statusCode: 404,
      code: "NotFoundException",
      message: "Specified subscription not found.",
    };
  }
  const notificationId = uuid.v4();
  const notification = {
    id: notificationId,
    type: options.type,
    payload: options.payload,
    expireAt: options.expireAt,
    isSent: false,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  await this.context.addNotification(subscriptionId, notification);
  await this.bus.publish(
    "EVENT:NOTIFICATION:CREATED",
    notificationId,
    notification
  );
  return {
    success: true,
    notification: {
      id: notificationId,
    },
  };
};

module.exports = NotificationApi;
