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
});
