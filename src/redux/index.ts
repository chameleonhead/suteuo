import { combineReducers, Reducer } from "redux";
import {
  apiActionCreators,
  apiMiddleware,
  apiReducer,
  apiSelectors,
  ApiState,
} from "./api";
import {
  authActionCreators,
  authMiddleware,
  authReducer,
  authSelectors,
  AuthState,
} from "./auth";
import {
  dataActionCreators,
  dataMiddleware,
  dataReducer,
  dataSelectors,
  DataState,
} from "./data";
import {
  uiActionCreators,
  uiMiddleware,
  uiReducer,
  uiSelectors,
  UiState,
} from "./ui";

export interface ApplicationState {
  api: ApiState;
  auth: AuthState;
  data: DataState;
  ui: UiState;
}

export const selectors = {
  ...apiSelectors,
  ...authSelectors,
  ...dataSelectors,
  ...uiSelectors,
};

export const actionCreators = {
  ...apiActionCreators,
  ...authActionCreators,
  ...dataActionCreators,
  ...uiActionCreators,
};

export const middlewares = [
  apiMiddleware,
  authMiddleware,
  dataMiddleware,
  ...uiMiddleware,
];

export const reducers: Reducer<ApplicationState> = combineReducers({
  api: apiReducer,
  auth: authReducer,
  data: dataReducer,
  ui: uiReducer,
});
