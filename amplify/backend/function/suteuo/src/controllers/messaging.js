const uuid = require("uuid");
const messaging = require("../models/messaging");
const notificationsService = require("../services/notifications");
const { notfound } = require("../utils/responseGenerator");
const { getUserId } = require("../utils/helpers");

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
  const userId = getUserId(req);
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
 * メッセージルームを作成する
 * @param {Request} req
 * @param {Response} res
 */
const postMessageRoom = async (req, res) => {
  const userId = getUserId(req);
  const { participants } = req.body;
  const roomId = uuid.v4();
  await messaging.addMessageRoom({
    id: roomId,
    participants: (participants || [])
      .filter((p) => p !== userId)
      .concat([userId]),
    creator: userId,
    createdAt: new Date().toISOString(),
  });
  res.status(200).json({ success: true, messageRoom: { id: roomId } });
};

/**
 * メッセージルームを更新する
 * @param {Request} req
 * @param {Response} res
 */
const putMessageRoom = async (req, res) => {
  const { roomId } = req.params;
  const { participants } = req.body;
  const messageRoom = await messaging.findMessageRoomById(roomId);
  if (!messageRoom) {
    notfound(res, "Specified message room not found.");
    return;
  }
  messageRoom.participants = participants;
  await messaging.updateMessageRoom(messageRoom);
  res.status(200).json({ success: true });
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
 * メッセージルームにメッセージを投稿する
 * @param {Request} req
 * @param {Response} res
 */
const postMessageRoomMessage = async (req, res) => {
  const userId = getUserId(req);
  const { roomId } = req.params;
  const messageRoom = await messaging.findMessageRoomById(roomId);
  if (!messageRoom) {
    notfound(res, "Specified message room not found.");
    return;
  }
  const { body } = req.body;

  const messageId = uuid.v4();
  const message = {
    id: messageId,
    body,
    sender: userId,
    createdAt: new Date().toISOString(),
  };
  await messaging.addMessageRoomMessage(roomId, message);
  const notificationData = {
    type: "MESSAGE_SENT",
    data: message,
  };
  for (const participant of messageRoom.participants) {
    if (participant !== userId) {
      await notificationsService.sendNotification(
        participant,
        notificationData
      );
    }
  }
  res.status(200).json({ success: true, message: { id: messageId } });
};

module.exports = {
  getMessageRooms,
  getMessageRoom,
  postMessageRoom,
  putMessageRoom,
  deleteMessageRoom,
  getMessageRoomMessages,
  postMessageRoomMessage,
};
