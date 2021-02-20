import { combineReducers } from "redux";
import { ApplicationState } from "..";
import * as SignupStore from "./signup";
import * as MessagingStore from "./messaging";

export interface UiState {
  signup: SignupStore.SignupState;
  messaging: MessagingStore.MessagingState;
}

export const uiSelectors = {
  getUiState: (state: ApplicationState) => state.ui,
  ...SignupStore.signupSelectors,
  ...MessagingStore.messagingSelectors,
};

export const uiActionCreators = {
  ...SignupStore.signupActionCreators,
  ...MessagingStore.messagingActionCreators,
};

export const uiMiddleware = [
  SignupStore.signupMiddleware,
  MessagingStore.messagingMiddleware,
];

export const uiReducer = combineReducers({
  signup: SignupStore.signupReducer,
  messaging: MessagingStore.messagingReducer,
});
