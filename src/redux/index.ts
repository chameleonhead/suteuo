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
  taskActionCreators,
  taskMiddleware,
  taskReducer,
  taskSelectors,
  TaskState,
} from "./task";
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
  task: TaskState;
}

export const selectors = {
  ...apiSelectors,
  ...authSelectors,
  ...dataSelectors,
  ...uiSelectors,
  ...taskSelectors,
};

export const actionCreators = {
  ...apiActionCreators,
  ...authActionCreators,
  ...dataActionCreators,
  ...uiActionCreators,
  ...taskActionCreators,
};

export const middlewares = [
  apiMiddleware,
  authMiddleware,
  dataMiddleware,
  ...uiMiddleware,
  taskMiddleware,
];

export const reducers: Reducer<ApplicationState> = combineReducers({
  api: apiReducer,
  auth: authReducer,
  data: dataReducer,
  ui: uiReducer,
  task: taskReducer,
});
