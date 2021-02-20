const context = require("../src/context");

describe("context", () => {
  beforeEach(async () => {
    await context.addUser({
      id: "user-1",
      area: "Area",
      username: "username",
      displayName: "Display Name",
      createdAt: "2021-02-01T10:20:30.010Z",
    });
  });
  afterEach(async () => {
    await context.removeUser("user-1");
    await context.removeUser("user-2");
  });
  it("addUser", async () => {
    await context.addUser({
      id: "user-2",
      area: "Area",
      username: "username",
      displayName: "Display Name",
      createdAt: "2021-02-01T10:20:30.010Z",
    });
    const user = await context.getUser("user-2");
    expect(user.id).toEqual("user-2");
  });
  it("updateUser", async () => {
    await context.updateUser({
      id: "user-1",
      area: "New Area",
      username: "New username",
      displayName: "New Display Name",
      createdAt: "2021-02-02T10:20:30.010Z",
    });
    const user = await context.getUser("user-1");
    expect(user).toEqual({
      id: "user-1",
      area: "New Area",
      username: "New username",
      displayName: "New Display Name",
      createdAt: "2021-02-02T10:20:30.010Z",
    });
  });
  it("removeUser", async () => {
    await context.removeUser("user-1");
    const user = await context.getUser("user-1");
    expect(user).toBeNull();
  });

  it.skip("createIdentity", async () => {
    const ret = await context.findIdentityByEmail("yuto.nagano@xsys.co.jp");
    if (ret) {
      await context.deleteIdentity(ret.id);
    }
    const result = await context.createIdentity(
      "yuto.nagano@xsys.co.jp",
      "P@ssw0rd"
    );
    expect(result).toMatchObject({
      identity: {
        id: expect.anything(),
      },
    });
    const findByEmailIdentity = await context.findIdentityByEmail(
      "yuto.nagano@xsys.co.jp"
    );
    const getIdentity = await context.getIdentity(result.identity.id);
    expect(findByEmailIdentity).toEqual(getIdentity);
  });
});
