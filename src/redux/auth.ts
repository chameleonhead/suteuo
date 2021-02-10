import { Auth } from "aws-amplify";
import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState } from ".";

export interface UserInfo {
  username: string;
}

export interface AuthState {
  state:
    | "NOT_LGGED_IN"
    | "WAITING_SIGNUP_CONFIRM"
    | "WAITING_LOGIN"
    | "LOGGED_IN";
  user: UserInfo | undefined;
}

export const authSelectors = {
  getAuthState: (state: ApplicationState) => state.auth,
};

interface SignupInfo {
  username: string;
  password: string;
}

interface ConfirmCodeInfo {
  username: string;
  code: string;
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

interface SignupSuccessAction {
  type: "SIGNUP_SUCCESS";
  payload: {
    nextState: AuthState["state"];
    user: UserInfo;
  };
}

interface ConfirmCodeAction {
  type: "CONFIRM_CODE";
  payload: ConfirmCodeInfo;
}

interface LoginAction {
  type: "LOGIN";
  payload: LoginInfo;
}

interface LogoutAction {
  type: "LOGOUT";
}

type KnownAction =
  | SignupAction
  | SignupSuccessAction
  | ConfirmCodeAction
  | LoginAction
  | LogoutAction;

export const authActionCreators = {
  signup: (info: SignupInfo): SignupAction => ({
    type: "SIGNUP",
    payload: info,
  }),
  confirmCode: (info: ConfirmCodeInfo): ConfirmCodeAction => ({
    type: "CONFIRM_CODE",
    payload: info,
  }),
  login: (info: LoginInfo): LoginAction => ({
    type: "LOGIN",
    payload: info,
  }),
  logout: (): LogoutAction => ({
    type: "LOGOUT",
  }),
};

export const authMiddleware: Middleware = ({ dispatch }) => (next) => (
  incomingAction
) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "SIGNUP") {
    const { username, password } = action.payload;
    Auth.signUp({
      username,
      password,
    })
      .then((value) => {
        // SIGNUP SUCCESS
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: {
            user: {
              username,
            },
            nextState: "WAITING_SIGNUP_CONFIRM",
          },
        } as SignupSuccessAction);
        console.log("SIGNUP SUCCESS");
        console.log(value);
      })
      .catch((err) => {
        // SIGNUP FAIL
        if (err.code) {
          // Cognito のエラー
          if (err.code === "UsernameExistsException") {
            dispatch(
              actionCreators.error("サインアップ", "ユーザーが既に存在します。")
            );
          }
        }
        console.error("SIGNUP FAIL");
        console.error(err);
      });
  }
  if (action.type === "CONFIRM_CODE") {
    const { username, code } = action.payload;
    Auth.confirmSignUp(username, code)
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

export const authReducer: Reducer<AuthState> = (state, incomingAction) => {
  if (!state) {
    state = {
      state: "NOT_LGGED_IN",
      user: undefined,
    };
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        state: action.payload.nextState,
        user: action.payload.user,
      };
  }
  return state;
};
