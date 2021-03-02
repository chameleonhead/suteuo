import { Middleware } from "redux";
import { actionCreators } from "..";
import { KnownAction as ApiAction } from "../api";

interface InitNotificationsAction {
  type: "INIT_NOTIFICATIONS";
}

interface NotificationReadAction {
  type: "NOTIFICATION_READ";
  payload: {
    notificationId: string;
  };
}

type KnownAction = InitNotificationsAction | NotificationReadAction | ApiAction;

export const notificationsActionCreators = {
  initNotifications: (): InitNotificationsAction => ({
    type: "INIT_NOTIFICATIONS",
  }),
  readNotification: (notificationId: string): NotificationReadAction => ({
    type: "NOTIFICATION_READ",
    payload: {
      notificationId,
    },
  }),
};

export const notificationsMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "INIT_NOTIFICATIONS") {
    dispatch(actionCreators.fetchNotifications());
  }
  if (action.type === "NOTIFICATION_READ") {
    dispatch(
      actionCreators.api(action.type, "POST_NOTIFICATION_READ", action.payload)
    );
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "NOTIFICATION_READ"
  ) {
    dispatch(actionCreators.fetchNotifications());
  }
  if (
    action.type === "API_FAILED" &&
    action.meta.returnAddress === "NOTIFICATION_READ"
  ) {
    console.error("登録に失敗しました。");
  }
};
