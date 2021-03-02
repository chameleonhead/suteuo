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

class DynamoDb {
  constructor(tableName) {
    this.tableName = tableName;
    this.client = docClient;
  }

  async add(item, loginUserId = "anonymous") {
    await docClient
      .put({
        TableName: this.tableName,
        Item: {
          CreatedAt: Date.now(),
          CreatedBy: loginUserId,
          ModifiedAt: Date.now(),
          ModifiedBy: loginUserId,
          ...item,
        },
      })
      .promise();
  }

  async update(item, loginUserId = "anonymous") {
    await docClient
      .put({
        TableName: this.tableName,
        Item: {
          ModifiedAt: Date.now(),
          ModifiedBy: loginUserId,
          ...item,
        },
      })
      .promise();
  }

  async delete(pk, sk) {
    await docClient
      .delete({
        TableName: this.tableName,
        Key: {
          PK: pk,
          SK: sk,
        },
      })
      .promise();
  }

  async find(pk, sk) {
    const result = await docClient
      .get({
        TableName: this.tableName,
        Key: {
          PK: pk,
          SK: sk,
        },
      })
      .promise();
    return result;
  }

  async batchFind(keys) {
    const result = await docClient
      .batchGet({
        RequestItems: {
          [this.tableName]: {
            Keys: keys,
          },
        },
      })
      .promise();
    return result;
  }

  async searchPk(pk) {
    var params = {
      TableName: process.env.STORAGE_SUTEUOMESSAGING_NAME,
      ExpressionAttributeValues: {
        ":id": pk,
      },
      KeyConditionExpression: "PK = :id",
    };

    return await docClient.query(params).promise();
  }

  async searchSk(sk) {
    var params = {
      TableName: this.tableName,
      FilterExpression: "SK = :sk",
      ExpressionAttributeValues: {
        ":sk": sk,
      },
    };
    return await docClient.scan(params).promise();
  }
}

module.exports = DynamoDb;
