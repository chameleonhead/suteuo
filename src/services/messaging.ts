import { API } from "aws-amplify";
import { ListRequest, ListResponse } from "./common";

export interface SendMessageRequest {
  recipients: string[];
  text: string;
}

export interface SendMessageResponse {
  messageBox: {
    id: string;
  };
}

export interface GetMessagesInMessageRoomRequest {
  roomId: string;
}

export interface MessageRoom {
  id: string;
  participants: string[];
}

export interface Message {
  id: string;
  text: string;
}

export interface MessagingService {
  postMessage(req: SendMessageRequest): Promise<SendMessageResponse>;
  getMessageRooms(req: ListRequest): Promise<ListResponse<MessageRoom>>;
  getMessagesInMessageRoom(
    req: GetMessagesInMessageRoomRequest & ListRequest
  ): Promise<ListResponse<MessageRoom>>;
}

export const messagingService: MessagingService = {
  postMessage: (req) => {
    return API.post("suteuorest", `/messaging/messages`, {
      body: req,
    });
  },
  getMessageRooms: (req) => {
    return API.get("suteuorest", "/messaging/rooms", {});
  },
  getMessagesInMessageRoom: (req) => {
    return API.get("suteuorest", `/messaging/rooms/${req.roomId}/messages`, {});
  },
};

export default messagingService;
