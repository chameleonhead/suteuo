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

const searchMessageRoomsForUser = async (userId) => {
  const filtered = messageRoomStore.all.filter((e) =>
    e.participants.include(userId)
  );
  return {
    totalCount: filtered.length,
    items: filtered,
  };
};

const addMessageRoom = async (messageRoom) => {
  messageRoomStore.add(messageRoom);
};

const updateMessageRoom = async (messageRoom) => {
  messageRoomStore.update(messageRoom);
};

const removeMessageRoom = async (messageRoomId) => {
  messageRoomStore.remove(messageRoomId);
};

const addMessageRoomMessage = async (roomId, message) => {
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

const findMessageRoomByParticipants = async (participants) => {
  return (
    messageRoomStore.all.filter(
      (e) => JSON.stringify(e.participants) === JSON.stringify(participants)
    )[0] || null
  );
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
  searchMessageRoomsForUser,
  findMessageRoomById,
  findMessageRoomByParticipants,
  searchMessageRoomMessages,
  addMessageRoom,
  addMessageRoomMessage,
  updateMessageRoom,
  removeMessageRoom,
};
