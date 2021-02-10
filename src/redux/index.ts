import { combineReducers, Reducer } from "redux";
import {
  authActionCreators,
  authMiddleware,
  authReducer,
  authSelectors,
  AuthState,
} from "./auth";
import {
  notificationActionCreators,
  notificationMiddleware,
  notificationReducer,
  notificationSelectors,
  NotificationState,
} from "./notification";

export interface ApplicationState {
  auth: AuthState;
  notification: NotificationState;
}

export const selectors = {
  ...authSelectors,
  ...notificationSelectors,
};

export const actionCreators = {
  ...authActionCreators,
  ...notificationActionCreators,
};

export const middlewares = [authMiddleware, notificationMiddleware];

export const reducers: Reducer<ApplicationState> = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});
