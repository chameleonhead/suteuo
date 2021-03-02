const controller = require("../src/controllers/notifications");
const { mockRequest, mockResponse } = require("./utils/express-mock");
jest.mock("../src/models/notifications", () => {
  const mockModel = require("./utils/notifications-mock");
  return mockModel;
});
const mockModel = require("./utils/notifications-mock");

describe("notifications controller", () => {
  describe("getWebPushNotificationConfig", () => {
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
});
