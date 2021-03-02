const Store = require("./store");
const notificationConfigStore = new Store();
const notificationStore = new Store();
const notificationsByUser = {};

const clear = () => {
  notificationConfigStore.clear();
  notificationStore.clear();
  for (let prop in notificationsByUser) {
    delete notificationsByUser[prop];
  }
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

const addNotification = async (notification) => {
  notificationStore.add(notification);
  const notifications = notificationsByUser[notification.userId];
  if (notifications) {
    notifications.push(notification);
  } else {
    notificationsByUser[notification.userId] = [notification];
  }
};

const updateNotificationsRead = async (userId, notificationIds) => {
  for (const notificationId of notificationIds) {
    const notification = notificationStore.findById(notificationId);
    notification.isRead = true;
    notificationStore.update(notification);
  }
};

const findNotificationById = async (userId, notificationId) => {
  return notificationStore.findById(notificationId);
};

const searchNotificationsForUser = async (userId) => {
  const notifications = notificationsByUser[userId];
  return {
    totalCount: notifications ? notifications.length : 0,
    items: notifications || [],
  };
};

module.exports = {
  clear,
  addNotificationConfig,
  findNotificationConfigByType,
  addNotification,
  updateNotificationsRead,
  findNotificationById,
  searchNotificationsForUser,
};
