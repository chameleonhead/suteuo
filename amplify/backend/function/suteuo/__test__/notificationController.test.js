const controller = require("../src/controllers/notifications");
const { mockRequest, mockResponse } = require("./utils/express-mock");
jest.mock("../src/models/notifications", () => {
  const mockModel = require("./utils/notifications-mock");
  return mockModel;
});
const mockModel = require("./utils/notifications-mock");

describe("notifications controller", () => {
  describe("getWebPushNotificationConfig", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    test("WEB通知の公開鍵を取得する", async () => {
      const notificationConfig1 = {
        id: "config-1",
        notificationType: "webpush",
        data: {
          publicKey: "publicKey",
        },
      };
      mockModel.addNotificationConfig(notificationConfig1);

      const req = mockRequest();
      const res = mockResponse();
      await controller.getWebPushNotificationConfig(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        config: {
          publicKey: "publicKey",
        },
      });
    });
  });
  describe("getNotifications", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    test("ログインユーザーの通知をすべて取得する", async () => {
      const notification = {
        id: "notification-1",
        userId: "user-1",
        message: { body: "text" },
      };
      mockModel.addNotification(notification);

      const req = mockRequest(undefined, "user-1");
      const res = mockResponse();
      await controller.getNotifications(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        totalCount: 1,
        items: [notification],
      });
    });
  });
  describe("postNotificationRead", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    test("1件の通知を既読にする", async () => {
      const notification = {
        id: "notification-1",
        userId: "user-1",
        message: { body: "text" },
      };
      mockModel.addNotification(notification);

      const req = mockRequest(
        {
          params: {
            notificationId: "notification-1",
          },
        },
        "user-1"
      );
      const res = mockResponse();
      await controller.postNotificationRead(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
      });
    });
  });
});
