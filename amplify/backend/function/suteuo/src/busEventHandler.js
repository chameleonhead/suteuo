const notificationContext = require("./notificationContext");
const uuid = require("uuid");

module.exports = async function (message) {
  if (message.type.startsWith("EVENT")) {
    notificationContext.addEvent({
      id: uuid.v4(),
      ...message,
      createdAt: new Date().toISOString(),
    });
  }
};
