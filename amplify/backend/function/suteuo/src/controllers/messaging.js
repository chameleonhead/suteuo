const uuid = require("uuid");
const messaging = require("../models/messaging");
const notificationsService = require("../services/notifications");
const { notfound } = require("../utils/responseGenerator");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').Handler} Handler
 */

/**
 * メッセージルームを検索する
 * @param {Request} req
 * @param {Response} res
 */
const getMessageRooms = async (req, res) => {
  const userId = req.user && req.user.username;
  const result = await messaging.searchMessageRoomsForUser(userId);
  res.status(200).json({ success: true, ...result });
};

/**
 * メッセージルームを取得する
 * @param {Request} req
 * @param {Response} res
 */
const getMessageRoom = async (req, res) => {
  const { roomId } = req.params;
  const messageRoom = await messaging.findMessageRoomById(roomId);
  if (!messageRoom) {
    notfound(res, "Specified message room not found.");
    return;
  }
  res.status(200).json({ success: true, messageRoom });
};

/**
 * メッセージルームを削除する
 * @param {Request} req
 * @param {Response} res
 */
const deleteMessageRoom = async (req, res) => {
  const { roomId } = req.params;
  const messageRoom = await messaging.findMessageRoomById(roomId);
  if (!messageRoom) {
    notfound(res, "Specified message room not found.");
    return;
  }
  await messaging.removeMessageRoom(roomId);
  res.status(200).json({ success: true });
};

/**
 * メッセージルーム内のメッセージを検索する
 * @param {Request} req
 * @param {Response} res
 */
const getMessageRoomMessages = async (req, res) => {
  const { roomId } = req.params;
  const messageRoom = await messaging.findMessageRoomById(roomId);
  if (!messageRoom) {
    notfound(res, "Specified message room not found.");
    return;
  }
  const result = await messaging.searchMessageRoomMessages(roomId);
  res.status(200).json({ success: true, ...result });
};

/**
 * メッセージを送信する
 * @param {Request} req
 * @param {Response} res
 */
const postMessage = async (req, res) => {
  const userId = req.user && req.user.username;
  const { recipients, text } = req.body;
  const messageId = uuid.v4();
  const message = {
    id: messageId,
    timestamp: new Date().toISOString(),
    text,
    sender: userId,
  };
  const distinctRecipients = [];
  for (const recipient of [...recipients, userId]) {
    if (!distinctRecipients.includes(recipient)) {
      distinctRecipients.push(recipient);
    }
  }
  distinctRecipients.sort();
  let messageRoom = await messaging.findMessageRoomByParticipants(
    distinctRecipients
  );
  if (messageRoom) {
    messageRoom.latestMessages = [...messageRoom.latestMessages, message];
    await messaging.updateMessageRoom(messageRoom);
  } else {
    messageRoom = {
      id: uuid.v4(),
      participants: distinctRecipients,
      latestMessages: [message],
    };
    messaging.addMessageRoom(messageRoom);
  }
  await messaging.addMessageRoomMessage(messageRoom.id, message);
  for (const participant of messageRoom.participants) {
    if (participant !== userId) {
      await notificationsService.sendNotification(
        participant,
        "MESSAGE_SENT",
        message
      );
    }
  }
  res.status(200).json({ success: true, message: { id: messageId } });
};

module.exports = {
  getMessageRooms,
  getMessageRoom,
  deleteMessageRoom,
  getMessageRoomMessages,
  postMessage,
};
