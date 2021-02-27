const Api = require("../src/notificationApi");
const Bus = require("../src/bus");
const bus = new Bus();

class Context {
  subscriptions = {};
  notifications = {};
  notificationsBySubscriptionId = {};
  events = {};
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
  addEventSubscription(eventSubscription) {
    this.eventSubscriptions[eventSubscription.id] = eventSubscription;
    this.eventDistribution[eventSubscription.id] = [];
  }
  removeEventSubscription(eventSubscriptionId) {
    delete this.eventSubscriptions[eventSubscriptionId];
    delete this.eventDistribution[eventSubscriptionId];
  }
  addEvent(event) {
    for (let eventSubscriptionId in this.eventSubscriptions) {
      if (
        this.eventSubscriptions[eventSubscriptionId].eventTypes.contains(
          event.type
        )
      ) {
        this.eventDistribution[eventSubscriptionId].push({
          event: event.id,
          isSent: false,
          createdAt: event.createdAt,
        });
      }
    }
  }
}

describe("notification api", () => {
  describe("createSubscription", () => {
    it("should create subscription", async () => {
      const api = new Api(bus, new Context());
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
  describe("createNotification", () => {
    it("should create subscription", async () => {
      const api = new Api(bus, new Context());
      const subResult = await api.createSubscription({ type: "webpush" });
      const result = await api.createNotification(subResult.subscription.id, {
        type: "subtype",
        payload: { payload: "data" },
      });
      expect(result).toMatchObject({
        success: true,
        notification: {
          id: expect.anything(),
        },
      });
      const { notifications } = await api.getNotificationsForSubscription(
        subResult.subscription.id
      );
      expect(notifications[0]).toMatchObject({
        id: expect.anything(),
        type: "subtype",
        payload: { payload: "data" },
        expireAt: undefined,
        isSent: false,
        isRead: false,
        createdAt: expect.anything(),
      });
    });
  });
});
