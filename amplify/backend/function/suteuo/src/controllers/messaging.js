const uuid = require("uuid");
const messaging = require("../models/messaging");
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
  const result = await messaging.searchMessageRoomsForUser("user-1");
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
  const { participants } = req.body;
  const messageRoomId = uuid.v4();
  await messaging.addMessageRoom({
    id: messageRoomId,
    participants: participants || ["user-1"],
    creator: "user-1",
    createdAt: new Date().toISOString(),
  });
  res.status(200).json({ success: true, messageRoom: { id: messageRoomId } });
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
  const { roomId } = req.params;
  const messageRoom = await messaging.findMessageRoomById(roomId);
  if (!messageRoom) {
    notfound(res, "Specified message room not found.");
    return;
  }
  const { body, sender } = req.body;
  const messageId = uuid.v4();
  await messaging.addMessageRoomMessage(roomId, {
    id: messageId,
    body,
    sender,
    createdAt: new Date().toISOString(),
  });
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
