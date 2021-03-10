const model = require("../models/notifications");
const webpush = require("../utils/webpush");

const sendNotification = (userId, data) => {
  const notification = model.createNotification(userId, data);
  model.addNotification(notification);
  const subscriptions = model.searchSubscriptionsByUser(userId);
  for (const sub of subscriptions.items) {
    switch (sub.subscriptionType) {
      case "webpush": {
        webpush.sendPushNotification(sub.data, notification);
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
