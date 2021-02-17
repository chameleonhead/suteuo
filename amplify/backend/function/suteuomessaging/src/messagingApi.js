const awsContext = require("./context");

/**
 * @type {import("../context")}
 */
/**
 * @constructor
 * @param {Context} context
 */
function MessagingApi(context) {
  this.context = context || awsContext;
}

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * @param {string} userId
 */
MessagingApi.prototype.getRoomsForUser = async function (userId) {
  const rooms = await this.context.getMessageRoomsForUser(userId);
  return {
    rooms,
  };
};

/**
 * @param {string} messageRoomId
 */
MessagingApi.prototype.getRoom = async function (messageRoomId) {
  const room = await this.context.getMessageRoom(messageRoomId);
  if (room) {
    return {
      success: true,
      room,
    };
  }
  return {
    success: false,
    statusCode: 404,
    code: "NotFoundException",
    message: "Specified message room not found.",
    retryable: false,
  };
};

/**
 * @param {string} messageRoomId
 */
MessagingApi.prototype.getMessagesForRoom = async function (messageRoomId) {
  const messages = await this.context.getMessageRoomMessages(messageRoomId);
  if (messages) {
    return {
      success: true,
      messages,
    };
  }
  return {
    success: false,
    statusCode: 404,
    code: "NotFoundException",
    message: "Specified message room not found.",
    retryable: false,
  };
};

/**
 * @typedef CreateRoomOptions
 * @property {string[]} participants
 * @property {string} creator
 */
/**
 * @param {CreateRoomOptions} options
 */
MessagingApi.prototype.createRoom = async function (options) {
  const roomId = options.id || id();
  await this.context.addMessageRoom({
    id: roomId,
    participants: options.participants,
    creator: options.creator,
    createdAt: new Date().toISOString(),
  });
  return {
    success: true,
    room: {
      id: roomId,
    },
  };
};

/**
 * @typedef UpdateRoomOptions
 * @property {string} roomId
 * @property {string[]} participants
 */
/**
 * @param {UreateRoomOptions} options
 */
MessagingApi.prototype.updateRoom = async function (options) {
  const room = await this.context.getMessageRoom(options.roomId);
  room.participants = options.participants;
  await this.context.updateMessageRoom(room);
  return {
    success: true,
  };
};

module.exports = MessagingApi;
