import { Middleware, Reducer } from "redux";
import { ApplicationState } from ".";

export interface UserInfo {
  username: string;
}

export interface NotificationState {}

export const notificationSelectors = {
  getNotificationState: (state: ApplicationState) => state.notification,
};

interface Notification {
  type: "error";
  title: string;
  message: string;
  details: any;
}

interface NotificationAction {
  type: "NOTIFICATION";
  payload: Notification;
}

type KnownAction = NotificationAction;

export const notificationActionCreators = {
  error: (
    title: string,
    message: string,
    details?: any
  ): NotificationAction => ({
    type: "NOTIFICATION",
    payload: {
      type: "error",
      title,
      message,
      details,
    },
  }),
};

export const notificationMiddleware: Middleware = ({ dispatch }) => (next) => (
  incomingAction
) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "NOTIFICATION") {
    console.log(action);
  }
};

export const notificationReducer: Reducer<NotificationState> = (state, _) => {
  if (!state) {
    state = {};
  }

  return state;
};
