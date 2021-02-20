import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState, selectors } from "..";
import { KnownAction as ApiAction } from "../api";

interface AddMessageInfo {
  body: string;
}

export interface MessagingState {}

export const messagingSelectors = {
  getMessagingState: (state: ApplicationState) =>
    selectors.getUiState(state).messaging,
};

interface AddMessageAction {
  type: "ADD_MESSAGE";
  payload: AddMessageInfo;
}

type KnownAction = AddMessageAction | ApiAction;

export const messagingActionCreators = {
  addMessage: (info: AddMessageInfo): AddMessageAction => ({
    type: "ADD_MESSAGE",
    payload: info,
  }),
};

export const messagingMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "ADD_MESSAGE") {
    dispatch(actionCreators.api(action.type, "POST_MESSAGE", action.payload));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "ADD_MESSAGE"
  ) {
    dispatch(actionCreators.fetchMessages());
  }
  if (
    action.type === "API_FAILED" &&
    action.meta.returnAddress === "ADD_MESSAGE"
  ) {
    console.error("登録に失敗しました。");
  }
};

export const messagingReducer: Reducer<MessagingState> = (state, _) => {
  if (!state) {
    state = {};
  }
  return state;
};
