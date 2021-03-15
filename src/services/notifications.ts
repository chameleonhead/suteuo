import { API } from "aws-amplify";
import { ListRequest, ListResponse } from "./common";

export interface Notification {
  id: string;
  type: string;
  timestamp: string;
  payload: object;
}

export interface PostNotificationReadRequest {
  notificationId: string;
}

export interface NotificationsService {
  getNotifications(req: ListRequest): Promise<ListResponse<Notification>>;
  postNotificationRead(req: PostNotificationReadRequest): Promise<void>;
}

const notificationsService: NotificationsService = {
  getNotifications: (req) => {
    return API.get("suteuorest", "/notifications", {});
  },
  postNotificationRead: (req) => {
    return API.post(
      "suteuorest",
      `/notifications/${req.notificationId}/read`,
      {}
    );
  },
};

export default notificationsService;
