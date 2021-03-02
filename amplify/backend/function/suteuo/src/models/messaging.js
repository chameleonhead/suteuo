const DynamoDb = require("./dynamodb");
const messagingTable = new DynamoDb(process.env.STORAGE_SUTEUOMESSAGING_NAME);

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
 * @property {string} roomId
 * @property {string} body
 * @property {string} sender
 * @property {string} createdAt
 */

/**
 * @param {string} userId
 * @returns {{totalCount: number; items: MessageRoom[]}}
 */
async function searchMessageRoomsForUser(userId) {
  const result = await messagingTable.searchSk("USER#" + userId);
  if (result.Count === 0) {
    return {
      totalCount: 0,
      items: [],
    };
  }
  const data = await messagingTable.batchFind(
    result.Items.map((item) => ({
      PK: item.PK,
      SK: "Details",
    }))
  );
  return {
    totalCount: result.Count,
    items: data.Responses[process.env.STORAGE_SUTEUOMESSAGING_NAME].map(
      (messageRoom) => ({
        id: messageRoom.Id,
        participants: messageRoom.Participants,
        creator: messageRoom.Creator,
        createdAt: messageRoom.CreatedAt,
      })
    ),
  };
}

/**
 * @param {string} roomId
 * @returns {MessageRoom}
 */
async function findMessageRoomById(roomId) {
  const messageRoom = await messagingTable.find(
    "MESSAGE_ROOM#" + roomId,
    "Details"
  );
  if (messageRoom.Item) {
    return {
      id: messageRoom.Item.Id,
      participants: messageRoom.Item.Participants,
      creator: messageRoom.Item.Creator,
      createdAt: messageRoom.Item.CreatedAt,
    };
  } else {
    return null;
  }
}

/**
 * @param {string} roomId
 * @returns {Message[]}
 */
async function searchMessageRoomMessages(roomId) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    ExpressionAttributeValues: {
      ":id": "MESSAGE_ROOM#" + roomId,
      ":value": "MESSAGE#",
    },
    KeyConditionExpression: "PK = :id and begins_with(SK, :value)",
  };
  const result = await messagingTable.client.query(params).promise();
  const messages = result.Items.map((item) => ({
    id: item.Id,
    roomId: item.MessageRoomId,
    body: item.Body,
    sender: item.Sender,
    createdAt: item.CreatedAt,
  }));
  return {
    totalCount: messages.length,
    items: messages,
  };
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
        Id: messageRoom.id,
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
  await messagingTable.client.batchWrite(params).promise();
}

/**
 * @param {string} roomId
 * @param {Message} message
 */
async function addMessageRoomMessage(roomId, message, loginUserId) {
  await messagingTable.add(
    {
      PK: "MESSAGE_ROOM#" + roomId,
      SK: "MESSAGE#" + message.id,
      Id: message.id,
      MessageRoomId: roomId,
      Body: message.body,
      Sender: message.sender,
      CreatedAt: message.createdAt,
    },
    loginUserId
  );
}

/**
 * @param {MessageRoom} messageRoom
 */
async function updateMessageRoom(messageRoom) {
  const room = await findMessageRoomById(messageRoom.id);

  const requests = [];
  requests.push({
    PutRequest: {
      Item: {
        PK: "MESSAGE_ROOM#" + messageRoom.id,
        SK: "Details",
        Id: messageRoom.id,
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
  await messagingTable.client.batchWrite(params).promise();
}

/**
 * @param {string} roomId
 */
async function removeMessageRoom(roomId) {
  const result = await messagingTable.searchPk("MESSAGE_ROOM#" + roomId);
  if (result.Items.length) {
    await messagingTable.client
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
  searchMessageRoomsForUser,
  findMessageRoomById,
  searchMessageRoomMessages,
  addMessageRoom,
  addMessageRoomMessage,
  updateMessageRoom,
  removeMessageRoom,
};
