const Api = require("../src/messagingApi");

class Context {
  messageRooms = {};
  messages = {};
  getMessageRoom(messageRoomId) {
    return Promise.resolve(this.messageRooms[messageRoomId]);
  }
  getMessageRoomMessages(messageRoomId) {
    return Promise.resolve(this.messages[messageRoomId]);
  }
  addMessageRoom(messageRoom) {
    this.messageRooms[messageRoom.id] = messageRoom;
    return Promise.resolve();
  }
  addMessageRoomMessage(messageRoomId, message) {
    this.messages[messageRoomId] = this.messages[messageRoomId]
      ? this.messages[messageRoomId].concat([message])
      : [message];
    return Promise.resolve();
  }
  updateMessageRoom(messageRoom) {
    this.messageRooms[messageRoom.id] = messageRoom;
    return Promise.resolve();
  }
  deleteMessageRoom(messageRoom) {
    delete this.messageRooms[messageRoom.id];
    return Promise.resolve();
  }
}

describe("messaging api", () => {
  describe("createRoom", () => {
    it("should create message room", async () => {
      const api = new Api(new Context());
      const result = await api.createRoom({
        participants: ["user-1", "user-2"],
        creator: "user-1",
      });
      expect(result).toMatchObject({
        success: true,
        room: {
          id: expect.anything(),
        },
      });
      const room = (await api.getRoom(result.room.id)).room;
      expect(room).toMatchObject({
        id: expect.anything(),
        creator: "user-1",
        participants: ["user-1", "user-2"],
        createdAt: expect.anything(),
      });
    });
  });
  describe("createMessage", () => {
    it("should create message in message room", async () => {
      const api = new Api(new Context());
      const roomResult = await api.createRoom({
        participants: ["user-1", "user-2"],
        creator: "user-1",
      });
      const roomId = roomResult.room.id;
      const result = await api.createMessage({
        roomId,
        body: "message body",
        sender: "user-1",
      });
      expect(result).toMatchObject({
        success: true,
        message: {
          id: expect.anything(),
        },
      });
      const messages = (await api.getMessagesForRoom(roomId)).messages;
      expect(messages).toMatchObject([
        {
          id: expect.anything(),
          body: "message body",
          sender: "user-1",
          createdAt: expect.anything(),
        },
      ]);
    });
  });
  describe("updateRoom", () => {
    it("should update message room participants", async () => {
      const api = new Api(new Context());
      const createResult = await api.createRoom({
        participants: ["user-1", "user-2"],
        creator: "user-1",
      });
      const roomId = createResult.room.id;
      const result = await api.updateRoom({
        roomId: roomId,
        participants: ["user-1", "user-2", "user-3"],
      });
      expect(result).toMatchObject({
        success: true,
      });
      const room = (await api.getRoom(roomId)).room;
      expect(room).toMatchObject({
        id: expect.anything(),
        creator: "user-1",
        participants: ["user-1", "user-2", "user-3"],
        createdAt: expect.anything(),
      });
    });
  });
});
