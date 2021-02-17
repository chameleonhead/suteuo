const AWS = require("aws-sdk");
if (process.env.ENDPOINT_OVERRIDE) {
  // 開発時のみの設定
  AWS.config.update({
    region: "us-west-2",
    endpoint: process.env.ENDPOINT_OVERRIDE,
    accessKeyId: "fakeAccessKeyId",
    secretAccessKey: "fakeSecretAccessKey",
  });
}
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * @typedef MessageRoom
 * @property {string} id
 * @property {string[]} participants
 * @property {string} creator
 * @property {string} createdAt
 */

/**
 * @typedef Message
 * @property {string} id
 * @property {string} body
 * @property {string} sender
 * @property {string} createdAt
 */

/**
 * @param {string} userId
 * @returns {{totalCount: number; items: MessageRoom[]}}
 */
async function getMessageRoomsForUser(userId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    Item: {
      SK: "USER#" + userId,
    },
  };
  const result = await docClient.scan(params).promise();
  const data = await docClient
    .batchGet({
      RequestItems: {
        [process.env.STORAGE_SUTEUOMESSAGING_NAME]: {
          Keys: result.Items.map((item) => ({
            PK: { S: item.PK },
            SK: { S: "Details" },
          })),
        },
      },
    })
    .promise();
  return {
    totalCount: result.Count,
    items: data.Responses[process.env.STORAGE_SUTEUOMESSAGING_NAME].map(
      (messageRoom) => ({
        id: messageRoom.PK.replace("MESSAGE_ROOM#"),
        participants: messageRoom.Participants,
        creator: messageRoom.Creator,
        createdAt: messageRoom.CreatedAt,
      })
    ),
  };
}

/**
 * @param {string} messageRoomId
 * @returns {MessageRoom}
 */
async function getMessageRoom(messageRoomId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    Key: {
      PK: "MESSAGE_ROOM#" + messageRoomId,
      SK: "Details",
    },
  };
  const messageRoom = await docClient.get(params).promise();
  if (messageRoom.Item) {
    return {
      id: messageRoom.Item.PK.replace("MESSAGE_ROOM#", ""),
      participants: messageRoom.Item.Participants,
      creator: messageRoom.Item.Creator,
      createdAt: messageRoom.Item.CreatedAt,
    };
  } else {
    return null;
  }
}

/**
 * @param {string} messageRoomId
 * @returns {Message[]}
 */
async function getMessageRoomMessages(messageRoomId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    ExpressionAttributeValues: {
      ":id": "MESSAGE_ROOM#" + messageRoomId,
      ":value": "MESSAGE#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const result = await docClient.query(params).promise();
  return result.Items.map((item) => ({
    id: item.SK.replace("MESSAGE#", ""),
    body: item.Body,
    sender: item.Sender,
    createdAt: item.CreatedAt,
  }));
}

/**
 * @param {MessageRoom} messageRoom
 */
async function addMessageRoom(messageRoom) {
  const requests = [];
  requests.push({
    PutRequest: {
      Item: {
        PK: "MESSAGE_ROOM#" + messageRoom.id,
        SK: "Details",
        Participants: messageRoom.participants,
        Creator: messageRoom.creator,
        CreatedAt: messageRoom.createdAt,
      },
    },
  });

  for (const user of messageRoom.participants) {
    requests.push({
      PutRequest: {
        Item: {
          PK: "MESSAGE_ROOM#" + messageRoom.id,
          SK: "USER#" + user,
          CreatedAt: messageRoom.createdAt,
        },
      },
    });
  }

  var params = {
    RequestItems: {
      [process.env.STORAGE_SUTEUOMESSAGING_NAME]: requests,
    },
  };
  await docClient.batchWrite(params).promise();
}

/**
 * @param {string} messageRoomId
 * @param {Message} message
 */
async function addMessageRoomMessage(messageRoomId, message) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    Item: {
      PK: "MESSAGE_ROOM#" + messageRoomId,
      SK: "MESSAGE#" + message.id,
      Body: message.body,
      Sender: message.sender,
      CreatedAt: message.createdAt,
    },
  };
  await docClient.put(params).promise();
}

/**
 * @param {MessageRoom} messageRoom
 */
async function updateMessageRoom(messageRoom) {
  const room = await getMessageRoom(messageRoom.id);

  const requests = [];
  requests.push({
    PutRequest: {
      Item: {
        PK: "MESSAGE_ROOM#" + messageRoom.id,
        SK: "Details",
        Participants: messageRoom.participants,
        Creator: messageRoom.creator,
        CreatedAt: messageRoom.createdAt,
      },
    },
  });

  const usersToRemove = room.participants.filter(
    (p) => !messageRoom.participants.includes(p)
  );
  for (const user of usersToRemove) {
    requests.push({
      DeleteRequest: {
        Key: {
          PK: "MESSAGE_ROOM#" + messageRoom.id,
          SK: "USER#" + user,
        },
      },
    });
  }

  for (const user of messageRoom.participants) {
    requests.push({
      PutRequest: {
        Item: {
          PK: "MESSAGE_ROOM#" + messageRoom.id,
          SK: "USER#" + user,
          CreatedAt: messageRoom.createdAt,
        },
      },
    });
  }

  var params = {
    RequestItems: {
      [process.env.STORAGE_SUTEUOMESSAGING_NAME]: requests,
    },
  };
  await docClient.batchWrite(params).promise();
}

/**
 * @param {string} messageRoomId
 */
async function deleteMessageRoom(messageRoomId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    ExpressionAttributeValues: {
      ":id": "MESSAGE_ROOM#" + messageRoomId,
    },
    KeyConditionExpression: "PK = :id",
  };
  const result = await docClient.query(params).promise();
  if (result.Items.length) {
    await docClient
      .batchWrite({
        RequestItems: {
          [process.env.STORAGE_SUTEUOMESSAGING_NAME]: result.Items.map((e) => ({
            DeleteRequest: {
              Key: {
                PK: e.PK,
                SK: e.SK,
              },
            },
          })),
        },
      })
      .promise();
  }
}

module.exports = {
  getMessageRoomsForUser,
  getMessageRoom,
  getMessageRoomMessages,
  addMessageRoom,
  addMessageRoomMessage,
  updateMessageRoom,
  deleteMessageRoom,
};
