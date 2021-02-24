import { Reducer } from "redux";
import { ApplicationState } from "..";
import * as SignupStore from "./signup";
import * as MessagingStore from "./messaging";

interface SignupState {
  waitingUserConfirmation: boolean;
}

export interface UiState {
  ["SIGNUP"]?: SignupState;
  [key: string]: any;
}

export const uiSelectors = {
  getUiState: (state: ApplicationState) => state.ui,
  getSignupState: (state: ApplicationState) => state.ui && state.ui["SIGNUP"],
};

interface InitPageStateAction<T = any> {
  type: "INIT_PAGE_STATE";
  payload: {
    pageKey: string;
    data: T;
  };
}

interface UpdatePageStateAction<T = any> {
  type: "UPDATE_PAGE_STATE";
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

type KnownAction =
  | InitPageStateAction
  | UpdatePageStateAction
  | ClearPageStateAction;

export const uiActionCreators = {
  initPage: <T>(pageKey: string, initialData: T): InitPageStateAction<T> => ({
    type: "INIT_PAGE_STATE",
    payload: {
      pageKey,
      data: initialData,
    },
  }),
  updatePage: <T>(pageKey: string, data: T): UpdatePageStateAction<T> => ({
    type: "UPDATE_PAGE_STATE",
    payload: {
      pageKey,
      data,
    },
  }),
  clearPage: <T>(pageKey: string, data: T): ClearPageStateAction => ({
    type: "CLEAR_PAGE_STATE",
    payload: {
      pageKey,
    },
  }),
  ...SignupStore.signupActionCreators,
  ...MessagingStore.messagingActionCreators,
};

export const uiMiddleware = [
  SignupStore.signupMiddleware,
  MessagingStore.messagingMiddleware,
];

export const uiReducer: Reducer<UiState> = (state, incomingAction) => {
  if (!state) {
    state = {};
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "INIT_PAGE_STATE": {
      return {
        ...state,
        [action.payload.pageKey]: action.payload.data,
      };
    }
    case "UPDATE_PAGE_STATE": {
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
