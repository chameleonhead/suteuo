const awsContext = require("./context");

/**
 * @constructor
 * @param {awsContext} context
 */
function UsersApi(context) {
  this.context = context || awsContext;
}

/**
 * @typedef User
 * @property {string} id
 * @property {string} area
 * @property {string} username
 * @property {string} displayName
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
  return {
    success: false,
    statusCode: 404,
    code: "NotFoundException",
    message: "Specified message room not found.",
    retryable: false,
  };
};

/**
 * @typedef UpdateUserOptions
 * @property {string} userId
 * @property {string} area
 * @property {string} username
 * @property {string} displayName
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
      displayName: options.displayName,
      createdAt: identity.createdAt,
    });
    return {
      success: true,
    };
  }
  user.area = options.area;
  user.username = options.username;
  user.displayName = options.displayName;
  await this.context.updateUser(user);
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
