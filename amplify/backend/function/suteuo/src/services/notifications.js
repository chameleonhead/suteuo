const model = require("../models/notifications");
const webpush = require("../utils/webpush");

const sendNotification = async (userId, data) => {
  const notification = await model.createNotification(userId, data);
  await model.addNotification(notification);
  const subscriptions = await model.searchSubscriptionsByUser(userId);
  for (const sub of subscriptions.items) {
    switch (sub.subscriptionType) {
      case "webpush": {
        await webpush.sendPushNotification(sub.data, notification);
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
