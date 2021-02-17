/**
 * @from "aws-sdk"
 * @import * as AWS
 */
/**
 * @typedef Context
 * @param {AWS.DynamoDB.DocumentClient} docClient
 */
function Context(docClient) {
  this.docClient = docClient;
}

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * @typedef CreateRoomOptions
 * @property {string[]} participants
 * @property {string} creator
 */
/**
 * @param {CreateRoomOptions} options
 */
Context.prototype.createRoom = async function (options) {
  const roomId = id();
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    Item: {
      PK: "MESSAGE_ROOM#" + roomId,
      SK: "Details",
      Participants: options.participants,
      Creator: options.creator,
      CreatedAt: new Date().toISOString(),
    },
  };
  await this.docClient.put(params).promise();
  return {
    success: true,
    room: {
      id: roomId,
    },
  };
};

/**
 * @typedef UpdateRoomOptions
 * @property {string} roomId
 * @property {string[]} participants
 */
/**
 * @param {UreateRoomOptions} options
 */
Context.prototype.updateRoom = async function (options) {
  var params = {
    TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
    Item: {
      PK: "MESSAGE_ROOM#" + options.roomId,
      SK: "Details",
    },
  };
  const room = await this.docClient.get(params).promise();
  room.Item.Participants = options.participants;
  await this.docClient.update(room).promise();
  return {
    success: true,
  };
};

module.exports = Context;
