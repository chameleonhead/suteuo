import { Reducer } from "redux";
import { ApplicationState } from "..";
import * as SignupStore from "./signup";
import * as MessagingStore from "./messaging";
import * as ForgotPasswordStore from "./forgotPassword";

interface SignupState {
  waitingUserConfirmation: boolean;
}
interface ForgotPasswordState {
  waitingUserConfirmation: boolean;
}

export interface UiState {
  ["SIGNUP"]?: SignupState;
  ["FORGOT_PASSWORD"]?: ForgotPasswordState;
  [key: string]: any;
}

export const uiSelectors = {
  getUiState: (state: ApplicationState) => state.ui,
  getSignupState: (state: ApplicationState) => state.ui["SIGNUP"],
  getForgotPasswordState: (state: ApplicationState) =>
    state.ui["FORGOT_PASSWORD"],
};

interface SetPageStateAction<T = any> {
  type: "SET_PAGE_STATE";
  payload: {
    pageKey: string;
    data: T;
  };
}

interface ClearPageStateAction {
  type: "CLEAR_PAGE_STATE";
  payload: {
    pageKey: string;
  };
}

type KnownAction = SetPageStateAction | ClearPageStateAction;

export const uiActionCreators = {
  setPageState: <T>(pageKey: string, initialData: T): SetPageStateAction<T> => ({
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
  ...SignupStore.signupActionCreators,
  ...MessagingStore.messagingActionCreators,
  ...ForgotPasswordStore.forgotPasswordActionCreators,
};

export const uiMiddleware = [
  SignupStore.signupMiddleware,
  MessagingStore.messagingMiddleware,
  ForgotPasswordStore.forgotPasswordMiddleware,
];

export const uiReducer: Reducer<UiState> = (state, incomingAction) => {
  if (!state) {
    state = {};
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
  }
  return state;
};
