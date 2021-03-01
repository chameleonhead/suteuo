const controller = require("../src/controllers/users");
const { mockRequest, mockResponse } = require("./utils/express-mock");
jest.mock("../src/models/users", () => {
  const mockModel = require("./utils/users-mock");
  return mockModel;
});
const mockModel = require("./utils/users-mock");

describe("user controller", () => {
  describe("getUser", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    it("ユーザーIDに該当するユーザー情報がある場合にユーザー情報を取得する", async () => {
      const user1 = {
        id: "user-1",
        area: "Area",
        name: "User Name",
      };
      mockModel.addUser(user1);

      const req = mockRequest({ params: { userId: "user-1" } });
      const res = mockResponse();
      await controller.getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: user1,
      });
    });
    it("ユーザーIDに該当するユーザー情報がない場合はエラー", async () => {
      const req = mockRequest();
      const res = mockResponse();
      await controller.getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ code: "NotFoundException" })
      );
    });
  });
  describe("searchUsers", () => {
    beforeEach(() => {
      mockModel.clear();
    });
    it("クエリを指定した場合にユーザーを検索する", async () => {
      const user1 = {
        id: "user-1",
        area: "Area",
        name: "User Name",
      };
      mockModel.addUser(user1);

      const req = mockRequest({ query: { q: "User" } });
      const res = mockResponse();
      await controller.getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        totalCount: 1,
        items: [user1],
      });
    });
  });
});
