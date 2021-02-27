const webpush = require("web-push");
const notificationContext = require("./notificationContext");

console.log(webpush.generateVAPIDKeys())

/**
 * @typedef PushSubsctiption
 * @property {string} endpoint
 * @property {{auth: string; p256dh: string}} keys
 */
/**
 * @param {PushSubsctiption} subscription
 * @param {*} notification
 */
const sendWebPushNotification = (subscription, notification) => {
  if (subscription.type === "webpush") {
    webpush.sendNotification(subscription, notification);
  }
};

module.exports = async function (message) {
  if (message.type === "NOTIFICATION") {
    let targetSubscriptions;
    if (message.meta.targetType === "SUBSCRIPTION") {
      const subscription = await notificationContext.getSubscription(
        message.meta.targetId
      );
      if (!subscription) {
        return;
      }
      targetSubscriptions = [subscription];
    } else {
      const result = await notificationContext.getSubscriptionsForUser(
        message.meta.targetId
      );
      if (!result.subscriptions) {
        return;
      }
      targetSubscriptions = result.subscriptions;
    }
    for (const subscription of targetSubscriptions) {
      if (subscription.type === "webpush") {
        sendWebPushNotification(subscription.data, message);
      }
    }
  }
};
