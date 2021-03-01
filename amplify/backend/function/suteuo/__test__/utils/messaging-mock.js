const Store = require("./store");
const messageRoomStore = new Store();
const messageStore = new Store();
const messagesByMessageRoomId = {};

const clear = () => {
  messageRoomStore.clear();
  messageStore.clear();
};

const getAllMessageRooms = () => {
  return messageRoomStore.getAll();
};
const addMessageRoom = async (messageRoom) => {
  messageRoomStore.add(messageRoom);
};

const addMessage = async (roomId, message) => {
  messageStore.add(message);
  const messages = messagesByMessageRoomId[roomId];
  if (messages) {
    messages.push(message);
  } else {
    messagesByMessageRoomId[roomId] = [message];
  }
};

const findMessageRoomById = async (roomId) => {
  return messageRoomStore.findById(roomId);
};

const searchMessageRoomMessages = async (roomId) => {
  const messages = messagesByMessageRoomId[roomId] || [];
  return {
    totalCount: messages.length,
    items: messages,
  };
};

module.exports = {
  clear,
  getAllMessageRooms,
  searchMessageRoomMessages,
  addMessageRoom,
  addMessage,
  findMessageRoomById,
};
