const controller = require("../src/controllers/messaging");
const { mockRequest, mockResponse } = require("./utils/express-mock");
jest.mock("../src/models/messaging", () => {
  const mockModel = require("./utils/messaging-mock");
  return mockModel;
});
const mockModel = require("./utils/messaging-mock");

jest.mock("../src/models/notifications", () => {
  const notificationModel = require("./utils/notifications-mock");
  return notificationModel;
});

describe("messaging controller", () => {
  describe("getMessageRoom", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    it("メッセージルームIDに該当するメッセージルームを取得する", async () => {
      const messageRoom1 = {
        id: "room-1",
        participanst: ["user-1"],
      };
      mockModel.addMessageRoom(messageRoom1);

      const req = mockRequest({ params: { roomId: "room-1" } });
      const res = mockResponse();
      await controller.getMessageRoom(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        messageRoom: messageRoom1,
      });
    });
    it("メッセージルームIDに該当するメッセージルームが存在しない場合はエラー", async () => {
      const req = mockRequest();
      const res = mockResponse();
      await controller.getMessageRoom(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ code: "NotFoundException" })
      );
    });
  });
  describe("getMessageRoomMessages", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    it("メッセージルームのメッセージを取得する", async () => {
      const messageRoom1 = {
        id: "room-1",
        participanst: ["user-1"],
      };
      const message1 = {
        id: "message-1",
        roomId: "room-1",
        body: "body",
      };
      mockModel.addMessageRoom(messageRoom1);
      mockModel.addMessageRoomMessage("room-1", message1);

      const req = mockRequest({ params: { roomId: "room-1" } });
      const res = mockResponse();
      await controller.getMessageRoomMessages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        totalCount: 1,
        items: [message1],
      });
    });
  });

  describe("postMessage", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    it("メッセージルームが存在しない場合にメッセージを送信する", async () => {
      const messageRequest = {
        recipients: ["user-2"],
        text: "message text",
      };
      const req = mockRequest({ body: messageRequest }, "user-1");
      const res = mockResponse();
      await controller.postMessage(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        messageRoom: {
          id: expect.anything(),
        },
        message: {
          id: expect.anything(),
        },
      });
      const createdMessageRoom = mockModel.getAllMessageRooms()[0];
      expect(createdMessageRoom).toEqual({
        id: expect.anything(),
        participants: ["user-1", "user-2"],
        latestMessages: [
          {
            id: expect.anything(),
            sender: "user-1",
            timestamp: expect.anything(),
            text: "message text",
          },
        ],
      });
      expect(
        (await mockModel.searchMessageRoomMessages(createdMessageRoom.id))
          .items[0]
      ).toEqual({
        id: expect.anything(),
        sender: "user-1",
        timestamp: expect.anything(),
        text: "message text",
      });
    });
  });
});
