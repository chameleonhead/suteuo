import { combineReducers } from "redux";
import { ApplicationState } from "..";
import * as SignupStore from "./signup";

export interface UiState {
  signup: SignupStore.SignupState;
}

export const uiSelectors = {
  getUiState: (state: ApplicationState) => state.ui,
  ...SignupStore.signupSelectors,
};

export const uiActionCreators = {
  ...SignupStore.signupActionCreators,
};

export const uiMiddleware = [SignupStore.signupMiddleware];

export const uiReducer = combineReducers({
  signup: SignupStore.signupReducer,
});
