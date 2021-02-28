const findUserById = async (userId) => {
  return Promise.resolve({});
};

const searchUser = async (query) => {
  return Promise.resolve({
    totalCount: 0,
    items: [],
  });
};

module.exports = {
  findUserById,
  searchUser,
};
