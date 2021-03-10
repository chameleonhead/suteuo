const model = require("../models/notifications");
const webpush = require("../utils/webpush");

const sendNotification = async (userId, data) => {
  const notification = await model.createNotification(userId, data);
  await model.addNotification(notification);
  const subscriptions = await model.searchSubscriptionsByUser(userId);
  for (const sub of subscriptions.items) {
    switch (sub.subscriptionType) {
      case "webpush": {
        if (!webpush.isVAPIDKeySet()) {
          const keys = await model.findNotificationConfigByType("webpush");
          webpush.setVAPIDKeys(keys.data);
        }
        try {
          await webpush.sendPushNotification(sub.data, notification);
        } catch (e) {
          console.error(e);
          if (e.statusCode === 410) {
            // Subscription has unsubscribed or expired.
            await model.deleteSubscriptionById(userId, sub.data.endpoint);
          }
        }
        break;
      }
      default:
        break;
    }
  }
};

module.exports = {
  sendNotification,
};
