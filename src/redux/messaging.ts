import { API } from "aws-amplify";
import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState, selectors } from ".";

export interface Message {
  messageId: string;
  body: string;
  sender: string;
  createdAt: string;
}

export interface MessagingState {
  messages: Message[];
}

export const messagingSelectors = {
  getMessages: (state: ApplicationState) => state.messaging.messages,
};

interface CreateMessageInfo {
  body: string;
}

interface CreateMessageAction {
  type: "CREATE_MESSAGE";
  payload: CreateMessageInfo;
}

interface RequestMessagesAction {
  type: "REQUEST_MESSAGE";
}

interface RequestMessagesSuccessAction {
  type: "REQUEST_MESSAGE_SUCCESS";
  payload: Message[];
}

type KnownAction =
  | CreateMessageAction
  | RequestMessagesAction
  | RequestMessagesSuccessAction;

export const messagingActionCreators = {
  createMessage: (info: CreateMessageInfo): CreateMessageAction => ({
    type: "CREATE_MESSAGE",
    payload: info,
  }),
  requestMessage: (): RequestMessagesAction => ({
    type: "REQUEST_MESSAGE",
  }),
  requestMessageSuccess: (items: Message[]): RequestMessagesSuccessAction => ({
    type: "REQUEST_MESSAGE_SUCCESS",
    payload: items,
  }),
};

export const messagingMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "CREATE_MESSAGE") {
    const { body } = action.payload;
    const { userInfo } = selectors.getAuthState(getState());
    API.post("suteuo", "/messaging", {
      body: {
        body,
        sender: userInfo?.id,
        createdAt: new Date().toISOString(),
      },
    }).then((data) => {
      console.log("CREATE_MESSAGE SUCCESS");
      console.log(data);

      dispatch(actionCreators.requestMessage());
    });
  }
  if (action.type === "REQUEST_MESSAGE") {
    API.get("suteuo", "/messaging", {}).then((data) => {
      console.log("REQUEST_MESSAGE SUCCESS");
      console.log(data);

      dispatch(actionCreators.requestMessageSuccess(data.messages));
    });
  }
};

export const messagingReducer: Reducer<MessagingState> = (
  state,
  incomingAction
) => {
  if (!state) {
    state = {
      messages: [],
    };
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_MESSAGE_SUCCESS":
      return {
        ...state,
        messages: action.payload,
      };
  }

  return state;
};
