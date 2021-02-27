const awsContext = require("./usersContext");

/**
 * @constructor
 * @param {import('./bus')} bus
 * @param {awsContext} context
 */
function UsersApi(bus, context) {
  this.bus = bus;
  this.context = context || awsContext;
}

/**
 * @typedef User
 * @property {string} id
 * @property {string} area
 * @property {string} username
 * @property {string} nickname
 * @property {string} avatarUrl
 * @property {string} createdAt
 */

/**
 * @param {string} userId
 * @returns {{success: boolean; user: User}}
 */
UsersApi.prototype.getUser = async function (userId) {
  const user = await this.context.getUser(userId);
  if (user) {
    return {
      success: true,
      user,
    };
  }
  const identity = await this.context.getIdentity(userId);
  if (identity) {
    return {
      success: true,
      user: {
        id: userId,
        nickname: undefined,
        username: identity.preferred_username,
        area: undefined,
        avatarUrl: identity.picture,
        createdAt: identity.createdAt,
      },
    };
  }
  return {
    success: false,
    statusCode: 404,
    code: "NotFoundException",
    message: "Specified user room not found.",
    retryable: false,
  };
};

/**
 * @typedef UpdateUserOptions
 * @property {string} userId
 * @property {string} area
 * @property {string} username
 * @property {string} nickname
 */
/**
 * @param {UreateUserOptions} options
 */
UsersApi.prototype.updateUser = async function (options) {
  const user = await this.context.getUser(options.userId);
  if (!user) {
    const identity = await this.context.getIdentity(options.userId);
    if (!identity) {
      return {
        statusCode: 404,
        code: "NotFoundException",
        message: "User not found.",
        retryable: false,
      };
    }
    await this.context.addUser({
      id: options.userId,
      area: options.area,
      username: options.username,
      nickname: options.nickname,
      createdAt: identity.createdAt,
    });
  } else {
    user.area = options.area;
    user.username = options.username;
    user.nickname = options.nickname;
    await this.context.updateUser(user);
    this.bus.dispatch();
  }
  return {
    success: true,
  };
};

/**
 * @typedef DeleteUserOptions
 * @property {string} userId
 */
/**
 * @param {DeleteUserOptions} options
 */
UsersApi.prototype.deleteUser = async function (options) {
  const user = await this.context.getUser(options.userId);
  if (!user) {
    return {
      statusCode: 404,
      code: "NotFoundException",
      message: "User not found.",
      retryable: false,
    };
  }
  await this.context.removeUser(user);
  return {
    success: true,
  };
};

module.exports = UsersApi;
