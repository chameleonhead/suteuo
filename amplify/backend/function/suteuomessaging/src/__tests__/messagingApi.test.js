const Api = require("../messagingApi");

describe("createRoom", () => {
  it("when calling createRoom then returns success", async () => {
    const docClient = {
      put: jest.fn((param) => {
        expect(param).toMatchObject({
          TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
          Item: {
            PK: expect.stringMatching(/^MESSAGE_ROOM#/),
            SK: "Details",
            Participants: ["user-1", "user-2"],
            Creator: "user-1",
            CreatedAt: expect.any(String),
          },
        });
        return {
          promise: jest.fn(),
        };
      }),
    };
    const context = new Api(docClient);
    const result = await context.createRoom({
      participants: ["user-1", "user-2"],
      creator: "user-1",
    });
    expect(result).toMatchObject({
      success: true,
      room: {
        id: expect.anything(),
      },
    });
  });
});

describe("updateRoom", () => {
  it("when calling updateRoom then returns success", async () => {
    const roomId = "room-1";
    const roomData = {
      PK: "MESSAGE_ROOM#" + roomId,
      SK: "Details",
      Participants: ["user-1", "user-2"],
      Creator: "user-1",
      CreatedAt: "2021-02-10T10:11:23.012Z",
    };
    const docClient = {
      get: jest.fn((param) => {
        expect(param).toMatchObject({
          TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
          Item: {
            PK: roomData.PK,
            SK: roomData.SK,
          },
        });
        return {
          promise: jest.fn().mockReturnValue({
            TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
            Item: roomData,
          }),
        };
      }),
      update: jest.fn((param) => {
        expect(param).toMatchObject({
          TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
          Item: {
            ...roomData,
            Participants: ["user-1", "user-2", "user-3"],
          },
        });
        return {
          promise: jest.fn(),
        };
      }),
    };
    const context = new Api(docClient);
    const result = await context.updateRoom({
      roomId: "room-1",
      participants: ["user-1", "user-2", "user-3"],
    });
    expect(result).toMatchObject({
      success: true,
    });
  });
});
