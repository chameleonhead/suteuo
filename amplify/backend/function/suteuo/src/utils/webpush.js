const webpush = require("web-push");
let vapidKeySet = false;

const generateVAPIDKeys = () => {
  return webpush.generateVAPIDKeys();
};

const isVAPIDKeySet = () => {
  return vapidKeySet;
};

const setVAPIDKeys = (vapidKeys) => {
  try {
    webpush.setVapidDetails(
      "mailto:contact@xsys.co.jp",
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );
    vapidKeySet = true;
  } catch (e) {
    console.error(e);
  }
};

const sendPushNotification = async (subscription, payload) => {
  await webpush.sendNotification(subscription, JSON.stringify(payload));
};

module.exports = {
  generateVAPIDKeys,
  isVAPIDKeySet,
  setVAPIDKeys,
  sendPushNotification,
};
