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
const cognitoProvider = new AWS.CognitoIdentityServiceProvider();

const convertToUser = (idUser, isOwner) => {
  function findAttrValue(attrName) {
    const filtered = (idUser.UserAttributes || idUser.Attributes).filter(
      (attr) => attr.Name === attrName
    );
    return filtered.length > 0 ? filtered[0].Value : null;
  }
  return {
    id: idUser.Username,
    name: findAttrValue("name"),
    email: isOwner ? findAttrValue("email") : undefined,
    email_verified: isOwner ? findAttrValue("email_verified") : undefined,
    phone_number: isOwner ? findAttrValue("phone_number") : undefined,
    phone_number_verified: isOwner
      ? findAttrValue("phone_number_verified")
      : undefined,
    picture: findAttrValue("picture"),
    enabled: idUser.Enabled,
    status: idUser.UserStatus,
    createdAt: idUser.UserCreateDate,
    lastModified: idUser.UserLastModifiedDate,
  };
};

const findUserById = async (userId, isOwner) => {
  const user = await cognitoProvider
    .adminGetUser({
      UserPoolId: process.env.AUTH_SUTEUO_USERPOOLID,
      Username: userId,
    })
    .promise();
  if (user) {
    return convertToUser(user, isOwner);
  }
  return null;
};

const searchUser = async (query, loginUserId) => {
  const users = [];
  let result;
  do {
    result = await cognitoProvider
      .listUsers({
        UserPoolId: process.env.AUTH_SUTEUO_USERPOOLID,
        Filter: query ? `name = "${query.replace(/"/g, "")}"` : undefined,
      })
      .promise();
    result.Users.forEach((user) =>
      users.push(convertToUser(user, user.Username === loginUserId))
    );
  } while (result.PaginationToken);
  return { totalCount: users.length, items: users };
};

module.exports = {
  findUserById,
  searchUser,
};
