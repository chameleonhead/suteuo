const store = {};
const all = [];

const clear = () => {
  for (const key in store) {
    if (Object.hasOwnProperty.call(store, key)) {
      delete store[key];
    }
  }
  all.splice(0, all.length);
};

const getAll = () => {
  return all;
};
const addMessageRoom = async (user) => {
  store[user.id] = user;
  all.push(user);
};

const findMessageRoomById = async (roomId) => {
  return store[roomId] || null;
};

module.exports = {
  clear,
  getAll,
  addMessageRoom: addMessageRoom,
  findMessageRoomById: findMessageRoomById,
};
