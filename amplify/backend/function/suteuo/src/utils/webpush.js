const webpush = require("web-push");

const generateVAPIDKeys = () => {
  return webpush.generateVAPIDKeys();
};

const sendPushNotification = async (subscription, payload) => {
  await webpush.sendNotification(subscription, payload);
};

module.exports = {
  generateVAPIDKeys,
  sendPushNotification,
};
