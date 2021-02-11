import { combineReducers, Reducer } from "redux";
import {
  authActionCreators,
  authMiddleware,
  authReducer,
  authSelectors,
  AuthState,
} from "./auth";
import {
  messagingActionCreators,
  messagingMiddleware,
  messagingReducer,
  messagingSelectors,
  MessagingState,
} from "./messaging";
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
  messaging: MessagingState;
}

export const selectors = {
  ...authSelectors,
  ...notificationSelectors,
  ...messagingSelectors,
};

export const actionCreators = {
  ...authActionCreators,
  ...notificationActionCreators,
  ...messagingActionCreators,
};

export const middlewares = [
  authMiddleware,
  notificationMiddleware,
  messagingMiddleware,
];

export const reducers: Reducer<ApplicationState> = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  messaging: messagingReducer,
});
