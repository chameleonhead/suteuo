const Store = require("./store");
const notificationConfigStore = new Store();

const clear = () => {
  notificationConfigStore.clear();
};

const addNotificationConfig = async (notificationConfig) => {
  notificationConfigStore.add(notificationConfig);
};

const findNotificationConfigByType = async (configType) => {
  const config = notificationConfigStore
    .getAll()
    .filter((e) => e.notificationType === configType)[0];
  return config || null;
};

module.exports = {
  clear,
  addNotificationConfig,
  findNotificationConfigByType,
};
