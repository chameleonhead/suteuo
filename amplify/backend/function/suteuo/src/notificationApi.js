const awsContext = require("./notificationContext");

/**
 * @constructor
 * @param {awsContext} context
 */
function NotificationApi(context) {
  this.context = context || awsContext;
}

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
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
 * @param {string} userId
 */
NotificationApi.prototype.getSubscriptionForUser = async function (userId) {
  const notifications = await this.context.getSubscriptionForUser(
    userId,
    false
  );
  return {
    success: true,
    totalCount: notifications.totalCount,
    notifications: notifications.notifications,
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
  const subscriptionId = id();
  await this.context.addSubscription({
    id: subscriptionId,
    type: options.type,
    user: options.user,
    clientInfo: options.clientInfo,
    data: options.data,
    createdAt: new Date().toISOString(),
  });
  return {
    success: true,
    subscription: {
      id: subscriptionId,
    },
  };
};

module.exports = NotificationApi;
