const Store = require("./store");

const store = new Store();

const clear = () => {
  store.clear();
};

const getAll = () => {
  return store.getAll();
};

const addUser = async (user) => {
  store.add(user);
};

const findUserById = async (userId) => {
  return store.findById(userId);
};
const searchUser = async (searchQuery) => {
  const filtered = store
    .getAll()
    .filter((e) => e.id === searchQuery || e.name.includes(searchQuery));
  return {
    totalCount: filtered.length,
    items: filtered,
  };
};

module.exports = {
  clear,
  getAll,
  addUser,
  findUserById,
  searchUser,
};
