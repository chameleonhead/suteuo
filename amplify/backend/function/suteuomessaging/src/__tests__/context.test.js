const context = require("../context");

describe("context", () => {
  beforeEach(async () => {
    await context.addMessageRoom({
      id: "room-1",
      participants: ["user-1", "user-2"],
      creator: "user-1",
      createdAt: "2021-02-01T10:20:30.010Z",
    });
  });
  afterEach(async () => {
    await context.deleteMessageRoom("room-1");
    await context.deleteMessageRoom("room-2");
  });
  it("addMessageRoom", async () => {
    await context.addMessageRoom({
      id: "room-2",
      participants: ["user-1", "user-2"],
      creator: "user-1",
      createdAt: "2021-02-01T10:20:30.010Z",
    });
    const room = await context.getMessageRoom("room-2");
    expect(room.id).toEqual("room-2");
  });
  it("updateMessageRoom", async () => {
    await context.updateMessageRoom({
      id: "room-1",
      participants: ["user-1", "user-2", "user-3"],
      creator: "user-1",
      createdAt: "2021-02-01T10:20:30.010Z",
    });
    const room = await context.getMessageRoom("room-1");
    expect(room.participants).toEqual(["user-1", "user-2", "user-3"]);
  });
  it("deleteMessageRoom", async () => {
    await context.deleteMessageRoom("room-1");
    const room = await context.getMessageRoom("room-1");
    expect(room).toBeNull();
  });
  it("addMessageRoomMessage", async () => {
    await context.addMessageRoomMessage("room-1", {
      id: "message-1",
      body: "message body",
      sender: "user-1",
      createdAt: "2021-02-01T10:20:30.010Z",
    });
    const messages = await context.getMessageRoomMessages("room-1");
    expect(messages).toEqual([
      {
        id: "message-1",
        body: "message body",
        sender: "user-1",
        createdAt: "2021-02-01T10:20:30.010Z",
      },
    ]);
  });
});
