const webpush = require("web-push");

const generateVAPIDKeys = () => {
  return webpush.generateVAPIDKeys();
};

const sendPushNotification = (subscription, payload) => {
  webpush.sendNotification(subscription, payload);
};

module.exports = {
  generateVAPIDKeys,
  sendPushNotification,
};
