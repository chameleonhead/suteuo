import { Middleware } from "redux";
import { actionCreators, selectors } from "..";
import { KnownAction as ApiAction } from "../api";

interface InitMessagingAction {
  type: "INIT_MESSAGING";
}

interface SetUserQueryAction {
  type: "SET_USER_QUERY";
  payload: {
    userQuery: string;
  };
}

interface SetMessageRoomIdAction {
  type: "SET_MESSAGE_ROOM_ID";
  payload: {
    roomId: string;
  };
}

interface CreateMessageInfo {
  recipients: string[];
  text: string;
}

interface CreateMessageAction {
  type: "CREATE_MESSAGE";
  payload: CreateMessageInfo;
}

type KnownAction =
  | InitMessagingAction
  | SetUserQueryAction
  | SetMessageRoomIdAction
  | CreateMessageAction
  | ApiAction;

export const messagingActionCreators = {
  initMessaging: (): InitMessagingAction => ({
    type: "INIT_MESSAGING",
  }),
  setUserQuery: (userQuery: string): SetUserQueryAction => ({
    type: "SET_USER_QUERY",
    payload: {
      userQuery,
    },
  }),
  setMessageRoomId: (roomId: string): SetMessageRoomIdAction => ({
    type: "SET_MESSAGE_ROOM_ID",
    payload: {
      roomId,
    },
  }),
  createMessage: (info: CreateMessageInfo): CreateMessageAction => ({
    type: "CREATE_MESSAGE",
    payload: info,
  }),
};

export const messagingMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "INIT_MESSAGING") {
    dispatch(actionCreators.fetchUsers());
    dispatch(actionCreators.fetchMessageRooms());
  }
  if (action.type === "SET_USER_QUERY") {
    const messagingState = selectors.getMessagingState(getState());
    dispatch(
      actionCreators.setPageState("MESSAGING", {
        ...messagingState,
        userQuery: action.payload.userQuery,
      })
    );
  }
  if (action.type === "SET_MESSAGE_ROOM_ID") {
    const messagingState = selectors.getMessagingState(getState());
    dispatch(actionCreators.fetchMessages(action.payload.roomId));
    dispatch(
      actionCreators.setPageState("MESSAGING", {
        ...messagingState,
        selectedMessageRoomId: action.payload.roomId,
      })
    );
  }

  if (action.type === "CREATE_MESSAGE") {
    dispatch(
      actionCreators.api(action.type, "POST_MESSAGE", {
        ...action.payload,
      })
    );
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "CREATE_MESSAGE"
  ) {
    dispatch(actionCreators.fetchMessages(action.payload.room.id));
  }
  if (
    action.type === "API_FAILED" &&
    action.meta.returnAddress === "CREATE_MESSAGE"
  ) {
    console.error("登録に失敗しました。");
  }
};
