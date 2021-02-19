import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState } from ".";
import { KnownAction as ApiAction } from "./api";

interface LoginInfo {
  username: string;
  password: string;
}

interface LoginUserInfo {
  id: string;
  preferred_username: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface AuthState {
  state: "INITIALIZING" | "NOT_LOGGED_IN" | "LOGGED_IN";
  user?: LoginUserInfo;
}

export const authSelectors = {
  getAuthState: (state: ApplicationState) => state.auth,
};

interface InitAuthAction {
  type: "INIT_AUTH";
}

interface LoginAction {
  type: "LOGIN";
  payload: LoginInfo;
}

interface LogoutAction {
  type: "LOGOUT";
}

interface SetAuthAction {
  type: "SET_AUTH";
  payload: LoginUserInfo;
}

interface ClearAuthAction {
  type: "CLEAR_AUTH";
}

type KnownAction =
  | InitAuthAction
  | LoginAction
  | LogoutAction
  | SetAuthAction
  | ClearAuthAction
  | ApiAction;

export const authActionCreators = {
  initAuth: (): InitAuthAction => ({
    type: "INIT_AUTH",
  }),
  login: (info: LoginInfo): LoginAction => ({
    type: "LOGIN",
    payload: info,
  }),
  logout: (): LogoutAction => ({
    type: "LOGOUT",
  }),
  setAuth: (user: LoginUserInfo): SetAuthAction => ({
    type: "SET_AUTH",
    payload: user,
  }),
  clearAuth: (): ClearAuthAction => ({
    type: "CLEAR_AUTH",
  }),
};

export const authMiddleware: Middleware = ({ dispatch }) => (next) => (
  incomingAction
) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "INIT_AUTH") {
    dispatch(actionCreators.api(action.type, "SESSION"));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "INIT_AUTH"
  ) {
    if (action.payload) {
      dispatch(actionCreators.setAuth(action.payload));
    } else {
      dispatch(actionCreators.clearAuth());
    }
  }
  if (action.type === "LOGIN") {
    dispatch(actionCreators.api(action.type, "LOGIN", action.payload));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "LOGIN"
  ) {
    if (action.payload) {
      dispatch(actionCreators.setAuth(action.payload));
    } else {
      dispatch(actionCreators.clearAuth());
    }
  }
  if (action.type === "API_FAILED" && action.meta.returnAddress === "LOGIN") {
    if (action.payload.code === "UserNotConfirmedException") {
      dispatch(actionCreators.setSignupWaitingUserConfirmation());
    }
  }
  if (action.type === "LOGOUT") {
    dispatch(actionCreators.api(action.type, "LOGOUT"));
    dispatch(actionCreators.clearAuth());
  }
};

export const authReducer: Reducer<AuthState> = (state, incomingAction) => {
  if (!state) {
    state = {
      state: "INITIALIZING",
    };
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "INIT_AUTH":
      return {
        state: "INITIALIZING",
      };
    case "SET_AUTH":
      return {
        state: "LOGGED_IN",
        user: action.payload,
      };
    case "CLEAR_AUTH":
      return {
        state: "NOT_LOGGED_IN",
      };
  }
  return state;
};
