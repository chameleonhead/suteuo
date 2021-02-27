const awsContext = require("./messagingContext");
const uuid = require("uuid");

/**
 * @constructor
 * @param {import('./bus')} bus
 * @param {awsContext} context
 */
function MessagingApi(bus, context) {
  this.bus = bus;
  this.context = context || awsContext;
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
      totalCount: messages.length,
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
  const roomId = options.roomId || uuid.v4();
  const room = {
    id: roomId,
    participants: options.participants,
    creator: options.creator,
    createdAt: new Date().toISOString(),
  };
  await this.context.addMessageRoom(room);
  await this.bus.publish("EVENT:MESSAGE_ROOM:CREATED", roomId, room);
  return {
    success: true,
    room: {
      id: roomId,
    },
  };
};

/**
 * @typedef CreateMessageOptions
 * @property {string} roomId
 * @property {string} body
 * @property {string} sender
 */
/**
 * @param {CreateRoomOptions} options
 */
MessagingApi.prototype.createMessage = async function (options) {
  if (!options.roomId) {
    return {
      statusCode: 400,
      code: "ValidationException",
      message: "Room id is not specidied.",
    };
  }
  const room = await this.context.getMessageRoom(options.roomId);
  if (!room) {
    return {
      statusCode: 404,
      code: "NotFoundException",
      message: "Message room not found.",
    };
  }
  const messageId = uuid.v4();
  const message = {
    id: messageId,
    body: options.body,
    sender: options.sender,
    createdAt: new Date().toISOString(),
  };
  await this.context.addMessageRoomMessage(options.roomId, message);
  await this.bus.publish("EVENT:MESSAGE:CREATED", messageId, message);
  return {
    success: true,
    message: {
      id: messageId,
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
  await this.bus.publish("EVENT:MESSAGE_ROOM:UPDATED", room.id, room);
  return {
    success: true,
  };
};

module.exports = MessagingApi;
