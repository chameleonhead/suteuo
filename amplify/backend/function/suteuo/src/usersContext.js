const AWS = require("aws-sdk");
if (process.env.ENDPOINT_OVERRIDE) {
  // 開発時のみの設定
  AWS.config.update({
    dynamodb: {
      region: "us-west-2",
      endpoint: process.env.ENDPOINT_OVERRIDE,
      accessKeyId: "fakeAccessKeyId",
      secretAccessKey: "fakeSecretAccessKey",
    },
  });
}
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * @typedef User
 * @property {string} id
 * @property {string} area
 * @property {string} username
 * @property {string} nickname
 * @property {string} createdAt
 */

/**
 * @param {string} userId
 * @returns {{totalCount: number; items: MessageRoom[]}}
 */
async function getUser(userId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOUSERS_NAME,
    Key: {
      PK: "USER#" + userId,
      SK: "Details",
    },
  };
  const result = await docClient.get(params).promise();
  if (!result.Item) {
    return null;
  }
  return {
    id: userId,
    area: result.Item.area,
    username: result.Item.username,
    nickname: result.Item.nickname,
    createdAt: result.Item.createdAt,
  };
}

/**
 * @param {User} user
 */
async function addUser(user) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOUSERS_NAME,
    Item: {
      PK: "USER#" + user.id,
      SK: "Details",
      area: user.area,
      username: user.username,
      nickname: user.nickname,
      createdAt: user.createdAt,
    },
  };
  await docClient.put(params).promise();
}

/**
 * @param {User} user
 */
async function updateUser(user) {
  const params = {
    TableName: process.env.STORAGE_SUTEUOUSERS_NAME,
    Key: {
      PK: "USER#" + user.id,
      SK: "Details",
    },
    AttributeUpdates: {
      area: {
        Action: "PUT",
        Value: user.area,
      },
      username: {
        Action: "PUT",
        Value: user.username,
      },
      nickname: {
        Action: "PUT",
        Value: user.nickname,
      },
      createdAt: {
        Action: "PUT",
        Value: user.createdAt,
      },
    },
  };
  await docClient.update(params).promise();
}

/**
 * @param {string} userId
 */
async function removeUser(userId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOUSERS_NAME,
    Key: {
      PK: "USER#" + userId,
      SK: "Details",
    },
  };
  await docClient.delete(params).promise();
}

/**
 * @typedef IdentityModel
 * @property {string} id
 * @property {string} preferred_username
 * @property {string} nickname
 * @property {string} email
 * @property {string} phone_number
 * @property {string} picture
 * @property {string} enabled
 * @property {string} status
 * @property {string} createdAt
 * @property {string} lastModified
 */

/**
 * @param {string} email
 * @returns {IdentityModel}
 */
async function findIdentityByEmail(email) {
  const provider = new AWS.CognitoIdentityServiceProvider();
  const result = await provider
    .listUsers({
      UserPoolId: process.env.AUTH_SUTEUO_USERPOOLID,
      Filter: `email = "${email.replace(/"/g, "")}"`,
    })
    .promise();
  if (result.Users.length > 0) {
    const user = result.Users[0];
    function findAttrValue(attrName) {
      const filtered = user.Attributes.filter((attr) => attr.Name === attrName);
      return filtered.length > 0 ? filtered[0].Value : null;
    }
    return {
      id: user.Username,
      preferred_username: findAttrValue("preferred_username"),
      nickname: findAttrValue("nickname"),
      email: findAttrValue("email"),
      phone_number: findAttrValue("phone_number"),
      picture: findAttrValue("picture"),
      enabled: user.Enabled,
      status: user.UserStatus,
      createdAt: user.UserCreateDate,
      lastModified: user.UserLastModifiedDate,
    };
  }
  return null;
}

/**
 * @param {string} userId
 * @returns {IdentityModel}
 */
async function getIdentity(userId) {
  const provider = new AWS.CognitoIdentityServiceProvider();
  const user = await provider
    .adminGetUser({
      UserPoolId: process.env.AUTH_SUTEUO_USERPOOLID,
      Username: userId,
    })
    .promise();
  if (user) {
    function findAttrValue(attrName) {
      const filtered = user.UserAttributes.filter(
        (attr) => attr.Name === attrName
      );
      return filtered.length > 0 ? filtered[0].Value : null;
    }
    return {
      id: user.Username,
      preferred_username: findAttrValue("preferred_username"),
      email: findAttrValue("email"),
      phone_number: findAttrValue("phone_number"),
      picture: findAttrValue("picture"),
      enabled: user.Enabled,
      status: user.UserStatus,
      createdAt: user.UserCreateDate,
      lastModified: user.UserLastModifiedDate,
    };
  }
  return null;
}

/**
 * @param {string} username
 * @param {string} password
 */
async function createIdentity(username, password) {
  const provider = new AWS.CognitoIdentityServiceProvider();
  const result = await provider
    .adminCreateUser({
      UserPoolId: process.env.AUTH_SUTEUO_USERPOOLID,
      Username: username,
      TemporaryPassword: password,
      MessageAction: "SUPPRESS",
    })
    .promise();
  return {
    identity: {
      id: result.User.Username,
    },
  };
}

/**
 * @param {string} userId
 */
async function deleteIdentity(userId) {
  if (!userId) {
    return;
  }
  const provider = new AWS.CognitoIdentityServiceProvider();
  await provider
    .adminDeleteUser({
      UserPoolId: process.env.AUTH_SUTEUO_USERPOOLID,
      Username: userId,
    })
    .promise();
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  removeUser,
  findIdentityByEmail,
  getIdentity,
  createIdentity,
  deleteIdentity,
};
