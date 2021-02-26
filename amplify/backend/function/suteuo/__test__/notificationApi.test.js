const Api = require("../src/notificationApi");

class Context {
  subscriptions = {};
  notifications = {};
  notificationsBySubscriptionId = {};
  getSubscription(subscriptionId) {
    return this.subscriptions[subscriptionId];
  }
  getSubscriptionsForUser(userId) {
    const result = [];
    for (const key in this.subscriptions) {
      if (this.subscriptions[key].user === userId) {
        result.push(this.subscriptions[key]);
      }
    }
    return {
      totalCount: result.length,
      items: result,
    };
  }
  getNotificationsForSubscription(subscriptionId) {
    const notifications = this.notificationsBySubscriptionId[subscriptionId];
    return { totalCount: notifications.length, items: notifications };
  }
  addSubscription(subscription) {
    this.subscriptions[subscription.id] = subscription;
    this.notificationsBySubscriptionId[subscription.id] = [];
  }
  removeSubscription(subscriptionId) {
    delete this.subscriptions[subscriptionId];
    const notifications = this.notificationsBySubscriptionId[subscriptionId];
    for (let notification of notifications) {
      delete this.notifications[notification.id];
    }
    delete this.notificationsBySubscriptionId[subscriptionId];
  }
  addNotification(subscriptionId, notification) {
    this.notifications[notification.id] = notification;
    this.notificationsBySubscriptionId[subscriptionId].push(notification);
  }
  updateNotificationSent(notificationId) {
    this.notifications[notificationId].isSent = true;
  }
  updateNotificationRead(notificationId) {
    this.notifications[notificationId].isRead = true;
  }
  removeNotification(notificationId) {
    const notification = this.notifications[notificationId];
    delete this.notifications[notificationId];
    for (let subscriptionId in this.notificationsBySubscriptionId) {
      const notifications = this.notificationsBySubscriptionId[subscriptionId];
      if (notifications.contains(notification))
        notifications.splice(notifications.indexOf(notification), 1);
    }
  }
}

describe("notification api", () => {
  describe("createNotificationTarget", () => {
    it("should create subscription", async () => {
      const api = new Api(new Context());
      const result = await api.createSubscription({
        type: "webpush",
        data: {
          endpoint: "webpushendpoint",
          keys: {
            auth: "auth",
            p256dh: "p256dh",
          },
        },
        user: "user-1",
      });
      expect(result).toMatchObject({
        success: true,
        subscription: {
          id: expect.anything(),
        },
      });
      const { subscription } = await api.getSubscription(
        result.subscription.id
      );
      expect(subscription).toMatchObject({
        id: expect.anything(),
        type: "webpush",
        user: "user-1",
        data: {
          endpoint: "webpushendpoint",
          keys: {
            auth: "auth",
            p256dh: "p256dh",
          },
        },
        createdAt: expect.anything(),
      });
    });
  });
});
