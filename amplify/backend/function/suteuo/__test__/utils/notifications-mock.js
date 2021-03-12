const uuid = require("uuid");
const Store = require("./store");
const notificationConfigStore = new Store();
const notificationStore = new Store();
const notificationsByUser = {};
const subscriptionsStore = new Store("subscriptionKey");

const clear = () => {
  notificationConfigStore.clear();
  notificationStore.clear();
  for (let prop in notificationsByUser) {
    delete notificationsByUser[prop];
  }
};

/**
 * @typedef Notification
 * @param {string} id
 * @param {string} userId
 * @param {string} timestamp
 * @param {string} type
 * @param {string} message
 * @param {string} data
 * @param {boolean} isRead
 */
const createNotification = (userId, type, payload) => {
  return {
    id: uuid.v4(),
    userId,
    timestamp: Date.now(),
    type,
    payload,
    isRead: false,
  };
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

const updateNotificationRead = async (userId, notificationId) => {
  const notification = notificationStore.findById(notificationId);
  notification.isRead = true;
  notificationStore.update(notification);
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

const searchSubscriptionsByUser = async (userId) => {
  const filtered = subscriptionsStore.all.filter((e) => e.user === userId);
  return {
    totalCount: filtered.length,
    items: filtered,
  };
};

const findSubscriptionById = async (subscriptionKey) => {
  return subscriptionsStore.findById(subscriptionKey);
};

const addSubscription = async (subscription) => {
  subscriptionsStore.add(subscription);
};

const updateSubscription = async (subscription) => {
  subscriptionsStore.update(subscription);
};

const deleteSubscriptionById = async (subscriptionKey) => {
  subscriptionsStore.remove(subscriptionKey);
};

module.exports = {
  clear,
  createNotification,
  addNotificationConfig,
  findNotificationConfigByType,
  addNotification,
  findNotificationById,
  searchNotificationsForUser,
  updateNotificationRead,
  searchSubscriptionsByUser,
  findSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscriptionById,
};
