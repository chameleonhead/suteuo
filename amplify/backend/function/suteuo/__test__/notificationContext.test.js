const context = require("../src/notificationContext");

describe("notificationContext", () => {
  beforeEach(async () => {
    await context.addSubscription({
      id: "subscription-1",
      clientInfo: "clientinfo",
      user: "user-1",
      data: { data: "test" },
      createdAt: "2021-02-01T10:20:30.010Z",
    });
  });
  afterEach(async () => {
    await context.removeSubscription("subscription-1");
    await context.removeSubscription("subscription-2");
  });
  it("addSubscription", async () => {
    await context.addSubscription({
      id: "subscription-2",
      user: "user-2",
      clientInfo: "clientinfo",
      data: { data: "test" },
      createdAt: "2021-02-01T10:20:30.010Z",
    });
    const subscription = await context.getSubscription("subscription-2");
    expect(subscription.id).toEqual("subscription-2");
  });
  it("addNotification", async () => {
    await context.addNotification("subscription-1", {
      id: "notification-1",
      payload: { body: "body" },
      isSent: false,
      isRead: false,
      createdAt: "2021-02-01T10:20:30.010Z",
      expireAt: "2021-03-01T10:20:30.010Z",
    });
    const notifications = await context.getNotificationsForSubscription(
      "subscription-1"
    );
    expect(notifications.items[0].id).toEqual("notification-1");
  });
});
