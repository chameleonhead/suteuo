const { mockRequest, mockResponse } = require("./utils/express-mock");
const controller = require("../src/controllers/users");
jest.mock("../src/models/users", () => {
  const mockUsers = require("./utils/users-mock");
  return mockUsers;
});
const mockUsers = require("./utils/users-mock");

describe("user controller", () => {
  describe("getUser", () => {
    beforeEach(() => {
      mockUsers.clear();
    });
    it("ユーザーIDに該当するユーザー情報がある場合にユーザー情報を取得する", async () => {
      const user1 = {
        id: "user-1",
        area: "Area",
        nickname: "Nickname",
      };
      mockUsers.addUser(user1);

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
      mockUsers.clear();
    });
    it("クエリを指定した場合にユーザーを検索する", async () => {
      const user1 = {
        id: "user-1",
        area: "Area",
        nickname: "Nickname",
      };
      mockUsers.addUser(user1);

      const req = mockRequest({ query: { q: "Nickname" } });
      const res = mockResponse();
      await controller.getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        totalCount: 1,
        items: [user1],
      });
    });
    it("クエリが指定されていない場合はエラー", async () => {
      const req = mockRequest();
      const res = mockResponse();
      await controller.getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ code: "ValidationException" })
      );
    });
  });
});
