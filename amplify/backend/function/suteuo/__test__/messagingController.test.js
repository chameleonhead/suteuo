const controller = require("../src/controllers/messaging");
const { mockRequest, mockResponse } = require("./utils/express-mock");
jest.mock("../src/models/messaging", () => {
  const mockModel = require("./utils/messaging-mock");
  return mockModel;
});
const mockModel = require("./utils/messaging-mock");

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
    it("メッセージルームIDに該当するメッセージルームが存在しにない場合はエラー", async () => {
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
      mockModel.addMessage("room-1", message1);

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

  describe("postMesageRoom", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    it("メッセージルームを作成する", async () => {
      const messageRoom1 = {
        id: "room-1",
        participants: ["user-2"],
      };
      const req = mockRequest({ body: messageRoom1 }, "user-1");
      const res = mockResponse();
      await controller.postMessageRoom(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        messageRoom: {
          id: expect.anything(),
        },
      });
      expect(mockModel.getAllMessageRooms()[0]).toEqual({
        id: expect.anything(),
        participants: ["user-2", "user-1"],
        creator: "user-1",
        createdAt: expect.anything(),
      });
    });
  });
});
