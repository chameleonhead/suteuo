import { Auth } from "aws-amplify";
import { Middleware, Reducer } from "redux";

export interface UserInfo {}

export interface AuthState {
  user: UserInfo | undefined;
}

interface SignupInfo {
  username: string;
  password: string;
}

interface LoginInfo {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface SignupAction {
  type: "SIGNUP";
  payload: SignupInfo;
}

interface LoginAction {
  type: "LOGIN";
  payload: LoginInfo;
}

interface LogoutAction {
  type: "LOGOUT";
  payload: LoginInfo;
}

type KnownAction = SignupAction | LoginAction | LogoutAction;

export const actionCreators = {
  signup: (info: SignupInfo) =>
    ({
      type: "SIGNUP",
      payload: info,
    } as SignupAction),
  login: (info: LoginInfo) =>
    ({
      type: "LOGIN",
      payload: info,
    } as LoginAction),
  logout: () =>
    ({
      type: "LOGOUT",
    } as LogoutAction),
};

export const authMiddleware: Middleware = (store) => (next) => (
  incomingAction
) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "SIGNUP") {
    Auth.signUp({
      username: action.payload.username,
      password: action.payload.password,
    })
      .then((value) => {
        // SIGNUP SUCCESS
        console.log("SIGNUP SUCCESS");
        console.log(value);
      })
      .catch((err) => {
        // SIGNUP FAIL
        console.error("SIGNUP FAIL");
        console.error(err);
      });
  }
  if (action.type === "LOGIN") {
    Auth.signIn({
      username: action.payload.username,
      password: action.payload.password,
    })
      .then((value) => {
        // LOGIN SUCCESS
        console.log("LOGIN SUCCESS");
        console.log(value);
      })
      .catch((err) => {
        // LOGIN FAIL
        console.error("LOGIN FAIL");
        console.error(err);
      });
  }
  if (action.type === "LOGOUT") {
    Auth.signOut()
      .then((value) => {
        // LOGOUT SUCCESS
        console.log("LOGOUT SUCCESS");
        console.log(value);
      })
      .catch((err) => {
        // LOGOUT FAIL
        console.error("LOGOUT FAIL");
        console.error(err);
      });
  }
};

export const authReducer: Reducer<AuthState> = (state, action) => {
  if (!state) {
    return {
      user: undefined,
    };
  }
  return state;
};
