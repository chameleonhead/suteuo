const DynamoDb = require("./dynamodb");
const table = new DynamoDb(process.env.STORAGE_SUTEUOMESSAGING_NAME);

/**
 * @typedef MessageRoom
 * @property {string} id
 * @property {string[]} participants
 */

/**
 * @typedef Message
 * @property {string} id
 * @property {string} timestamp
 * @property {string} sender
 * @property {string} text
 */

/**
 * @param {string} userId
 * @returns {{totalCount: number; items: MessageRoom[]}}
 */
async function searchMessageRoomsForUser(userId) {
  const result = await table.searchSk("USER#" + userId);
  if (result.Count === 0) {
    return {
      totalCount: 0,
      items: [],
    };
  }
  const batchResult = await table.batchFind(
    result.Items.map((item) => ({
      PK: item.PK,
      SK: "A",
    }))
  );
  return {
    totalCount: batchResult.length,
    items: batchResult.map((item) => item.Entity),
  };
}

/**
 * @param {string} roomId
 * @returns {MessageRoom}
 */
async function findMessageRoomById(roomId) {
  const messageRoom = await table.find("MESSAGE_ROOM#" + roomId, "A");
  if (messageRoom.Item) {
    return messageRoom.Item.Entity;
  } else {
    return null;
  }
}

/**
 * @param {string} roomId
 * @returns {MessageRoom}
 */
async function findMessageRoomByParticipants(participants) {
  for (const participant of participants) {
    const result = await searchMessageRoomsForUser(participant);
    for (const room of result.items) {
      if (JSON.stringify(room.participants) === JSON.stringify(participants)) {
        return room;
      }
    }
  }
  return null;
}

/**
 * @param {string} roomId
 * @returns {Message[]}
 */
async function searchMessageRoomMessages(roomId) {
  var params = {
    TableName: table.tableName,
    ExpressionAttributeValues: {
      ":id": "MESSAGE_ROOM#" + roomId,
      ":value": "MESSAGE#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const result = await table.client.query(params).promise();
  const messages = result.Items.sort((l, r) => l.ModifiedAt - r.ModifiedAt).map(
    (item) => item.Entity
  );
  return {
    totalCount: messages.length,
    items: messages,
  };
}

/**
 * @param {MessageRoom} messageRoom
 * @param {string} loginUserId
 */
async function addMessageRoom(messageRoom, loginUserId) {
  const requests = [];
  requests.push({
    PutRequest: {
      Item: {
        PK: "MESSAGE_ROOM#" + messageRoom.id,
        SK: "A",
        Entity: messageRoom,
        CreatedAt: Date.now(),
        CreatedBy: loginUserId,
        ModifiedAt: Date.now(),
        ModifiedBy: loginUserId,
      },
    },
  });

  for (const user of messageRoom.participants) {
    requests.push({
      PutRequest: {
        Item: {
          PK: "MESSAGE_ROOM#" + messageRoom.id,
          SK: "USER#" + user,
          CreatedAt: Date.now(),
          CreatedBy: loginUserId,
        },
      },
    });
  }

  var params = {
    RequestItems: {
      [table.tableName]: requests,
    },
  };
  await table.client.batchWrite(params).promise();
}

/**
 * @param {string} roomId
 * @param {Message} message
 */
async function addMessageRoomMessage(roomId, message, loginUserId) {
  await table.add(
    {
      PK: "MESSAGE_ROOM#" + roomId,
      SK: "MESSAGE#" + message.id,
      Entity: message,
      CreatedAt: Date.now(),
      CreatedBy: loginUserId,
      ModifiedAt: Date.now(),
      ModifiedBy: loginUserId,
    },
    loginUserId
  );
}

/**
 * @param {MessageRoom} messageRoom
 */
async function updateMessageRoom(messageRoom, loginUserId) {
  table.update(
    {
      PK: "MESSAGE_ROOM#" + messageRoom.id,
      SK: "A",
      Entity: messageRoom,
    },
    loginUserId
  );
}

/**
 * @param {string} roomId
 */
async function removeMessageRoom(roomId) {
  const result = await table.searchPk("MESSAGE_ROOM#" + roomId);
  if (result.Items.length) {
    await table.client
      .batchWrite({
        RequestItems: {
          [table.tableName]: result.Items.map((e) => ({
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
  searchMessageRoomsForUser,
  findMessageRoomById,
  findMessageRoomByParticipants,
  searchMessageRoomMessages,
  addMessageRoom,
  addMessageRoomMessage,
  updateMessageRoom,
  removeMessageRoom,
};
