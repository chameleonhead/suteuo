const Api = require("../src/usersApi");

class Context {
  identities = {};
  users = {};
  createIdentity(username, password) {
    const userId = Math.random().toString(36).substring(2);
    this.identities[userId] = {
      id: userId,
      createdAt: new Date().toISOString(),
    };
    return Promise.resolve({ identity: { id: userId } });
  }
  getIdentity(userId) {
    return Promise.resolve(this.identities[userId]);
  }
  getUser(userId) {
    return Promise.resolve(this.users[userId]);
  }
  addUser(user) {
    if (!user.id) {
      return Promise.reject("id not specified");
    }
    this.users[user.id] = user;
    return Promise.resolve();
  }
  updateUser(user) {
    if (!this.users[user.id]) {
      return Promise.reject("user not found");
    }
    this.users[user.id] = user;
    return Promise.resolve();
  }
  removeUser(user) {
    delete this.users[user.id];
    return Promise.resolve();
  }
}

describe("users api", () => {
  describe("getUser", () => {
    it("should fail if identity not exists", async () => {
      const api = new Api(new Context());
      const result = await api.getUser("invaliduserid");
      expect(result).toMatchObject({ success: false });
    });
  });
  describe("updateUser", () => {
    it("should create user when first update", async () => {
      const context = new Context();
      const idResult = await context.createIdentity(
        "test@example.com",
        "P@ssw0rd"
      );
      const userId = idResult.identity.id;
      const api = new Api(context);
      const result = await api.updateUser({
        userId: userId,
        area: "Area",
        username: "username",
        displayName: "Display Name",
      });
      expect(result).toEqual({ success: true });
      const user = (await api.getUser(userId)).user;
      expect(user).toMatchObject({
        id: userId,
        area: "Area",
        username: "username",
        displayName: "Display Name",
        createdAt: expect.anything(),
      });
    });
    it("should update user when second update", async () => {
      const context = new Context();
      const idResult = await context.createIdentity(
        "test@example.com",
        "P@ssw0rd"
      );
      const userId = idResult.identity.id;
      const api = new Api(context);
      await api.updateUser({
        userId: userId,
        area: "Area",
        username: "username",
        displayName: "Display Name",
      });
      const result = await api.updateUser({
        userId: userId,
        area: "New Area",
        username: "newusername",
        displayName: "New Display Name",
      });
      expect(result).toMatchObject({
        success: true,
      });
      const user = (await api.getUser(userId)).user;
      expect(user).toMatchObject({
        id: userId,
        area: "New Area",
        username: "newusername",
        displayName: "New Display Name",
        createdAt: expect.anything(),
      });
    });
  });
});
