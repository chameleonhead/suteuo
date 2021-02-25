const context = require("../src/notificationContext");

describe("notificationContext", () => {
  beforeEach(async () => {
    await context.addNotificationTarget({
      id: "target-1",
      targetName: "Target Name",
      user: "user-1",
      preference: { preference: "test" },
      createdAt: "2021-02-01T10:20:30.010Z",
    });
  });
  afterEach(async () => {
    await context.removeNotificationTarget("target-1");
    await context.removeNotificationTarget("target-2");
  });
  it("addNotificationTarget", async () => {
    await context.addNotificationTarget({
      id: "target-2",
      targetName: "Target Name",
      user: "user-2",
      preference: { preference: "test" },
      createdAt: "2021-02-01T10:20:30.010Z",
    });
    const targets = await context.getNotificationTargetsByUser("user-2");
    expect(targets[0].id).toEqual("target-2");
  });
  it("addNotification", async () => {
    await context.addNotification("target-1", {
      id: "notification-1",
      payload: { body: "body" },
      isSent: false,
      isRead: false,
      createdAt: "2021-02-01T10:20:30.010Z",
      expireAt: "2021-03-01T10:20:30.010Z",
    });
    const notifications = await context.getNotificationsForTarget("target-1");
    expect(notifications.items[0].id).toEqual("notification-1");
  });
});
