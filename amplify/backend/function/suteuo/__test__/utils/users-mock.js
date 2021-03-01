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

const addUser = async (user) => {
  store[user.id] = user;
  all.push(user);
};

const findUserById = async (userId) => {
  return store[userId] || null;
};
const searchUser = async (searchQuery) => {
  const filtered = all.filter(
    (e) => e.id === searchQuery || e.name.includes(searchQuery)
  );
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
