const webpush = require("web-push");

const generateVAPIDKeys = () => {
  return webpush.generateVAPIDKeys();
};

module.exports = {
  generateVAPIDKeys,
};
