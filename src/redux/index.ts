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
import {
  userActionCreators,
  userMiddleware,
  userReducer,
  userSelectors,
  UserState,
} from "./users";

export interface ApplicationState {
  auth: AuthState;
  users: UserState;
  messaging: MessagingState;
  notification: NotificationState;
}

export const selectors = {
  ...authSelectors,
  ...userSelectors,
  ...messagingSelectors,
  ...notificationSelectors,
};

export const actionCreators = {
  ...authActionCreators,
  ...userActionCreators,
  ...messagingActionCreators,
  ...notificationActionCreators,
};

export const middlewares = [
  authMiddleware,
  userMiddleware,
  messagingMiddleware,
  notificationMiddleware,
];

export const reducers: Reducer<ApplicationState> = combineReducers({
  auth: authReducer,
  users: userReducer,
  messaging: messagingReducer,
  notification: notificationReducer,
});
