import { Reducer } from "redux";
import { ApplicationState } from "..";
import * as SignupStore from "./signup";
import * as MessagingStore from "./messaging";
import * as ForgotPasswordStore from "./forgotPassword";
import * as NotificationStore from "./notifications";

interface DialogMessage {
  id: string;
  type: "info" | "warning" | "error";
  title: string;
  message: string;
}

interface SignupState {
  waitingUserConfirmation: boolean;
}

interface ForgotPasswordState {
  waitingUserConfirmation: boolean;
}

interface MessagingUiState {
  userQuery: string | undefined;
  selectedMessageRoomId: string | undefined;
}

export interface UiState {
  ["SIGNUP"]?: SignupState;
  ["FORGOT_PASSWORD"]?: ForgotPasswordState;
  ["MESSAGING"]?: MessagingUiState;
  [key: string]: any;
  messages: DialogMessage[];
}

export const uiSelectors = {
  getDialogMessages: (state: ApplicationState) => state.ui.messages,
  getUiState: (state: ApplicationState) => state.ui,
  getSignupState: (state: ApplicationState) => state.ui["SIGNUP"],
  getForgotPasswordState: (state: ApplicationState) =>
    state.ui["FORGOT_PASSWORD"],
  getMessagingState: (state: ApplicationState) => state.ui["MESSAGING"],
};

type UiStateKey = string & keyof UiState;
interface SetPageStateAction<K extends UiStateKey = any, T = UiState[K]> {
  type: "SET_PAGE_STATE";
  payload: {
    pageKey: K;
    data: T;
  };
}

interface ClearPageStateAction {
  type: "CLEAR_PAGE_STATE";
  payload: {
    pageKey: string;
  };
}

interface ShowDialogMessageAction {
  type: "SHOW_DIALOG_MESSAGE";
  payload: {
    type: "info" | "warning" | "error";
    title: string;
    message: string;
  };
}

interface CloseDialogMessageAction {
  type: "CLOSE_DIALOG_MESSAGE";
  payload: {
    messageId: string;
  };
}

type KnownAction =
  | SetPageStateAction
  | ClearPageStateAction
  | ShowDialogMessageAction
  | CloseDialogMessageAction;

export const uiActionCreators = {
  setPageState: <K extends UiStateKey, T = UiState[K]>(
    pageKey: K,
    initialData: T
  ): SetPageStateAction<K, T> => ({
    type: "SET_PAGE_STATE",
    payload: {
      pageKey,
      data: initialData,
    },
  }),
  clearPageState: <T>(pageKey: string, data: T): ClearPageStateAction => ({
    type: "CLEAR_PAGE_STATE",
    payload: {
      pageKey,
    },
  }),
  showMessageDialog: (
    type: "info" | "warning" | "error",
    title: string,
    message: string
  ): ShowDialogMessageAction => ({
    type: "SHOW_DIALOG_MESSAGE",
    payload: {
      type,
      title,
      message,
    },
  }),
  closeMessageDialog: (messageId: string): CloseDialogMessageAction => ({
    type: "CLOSE_DIALOG_MESSAGE",
    payload: {
      messageId,
    },
  }),
  ...SignupStore.signupActionCreators,
  ...MessagingStore.messagingActionCreators,
  ...ForgotPasswordStore.forgotPasswordActionCreators,
  ...NotificationStore.notificationsActionCreators,
};

export const uiMiddlewares = [
  SignupStore.signupMiddleware,
  MessagingStore.messagingMiddleware,
  ForgotPasswordStore.forgotPasswordMiddleware,
  NotificationStore.notificationsMiddleware,
];

export const uiReducer: Reducer<UiState> = (state, incomingAction) => {
  if (!state) {
    state = {
      messages: [],
    };
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "SET_PAGE_STATE": {
      return {
        ...state,
        [action.payload.pageKey]: action.payload.data,
      };
    }
    case "CLEAR_PAGE_STATE": {
      const newState = {
        ...state,
      };
      delete newState[action.payload.pageKey];
      return newState;
    }
    case "SHOW_DIALOG_MESSAGE": {
      return {
        ...state,
        messages: [
          ...state.messages,
          { ...action.payload, id: String(Date.now()) },
        ],
      };
    }
    case "CLOSE_DIALOG_MESSAGE": {
      const messages = [...state.messages].filter(
        (m) => m.id !== action.payload.messageId
      );
      return {
        ...state,
        messages: messages,
      };
    }
  }
  return state;
};
