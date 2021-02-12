import { Auth } from "aws-amplify";
import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState } from ".";

export interface UserCredential {
  username: string;
  password: string;
}

export interface UserInfo {
  username: string;
  displayName: string;
}

export interface AuthState {
  state:
    | "INITIALIZING"
    | "NOT_LOGGED_IN"
    | "WAITING_CONFIRM_CODE"
    | "LOGGED_IN";
  credential: UserCredential | undefined;
  user: UserInfo | undefined;
}

export const authSelectors = {
  getAuthState: (state: ApplicationState) => state.auth,
};

interface SignupInfo {
  username: string;
  email: string;
  password: string;
}

interface ConfirmCodeInfo {
  username: string;
  password: string;
  code: string;
}

interface LoginInfo {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface InitAuthAction {
  type: "INIT_AUTH";
}

interface InitAuthCompletedAction {
  type: "INIT_AUTH_COMPLETED";
}

interface SignupAction {
  type: "SIGNUP";
  payload: SignupInfo;
}

interface RequireConfirmationAction {
  type: "REQUIRE_CONFIRMATION";
  payload: UserCredential;
}

interface ConfirmCodeAction {
  type: "CONFIRM_CODE";
  payload: ConfirmCodeInfo;
}

interface LoginAction {
  type: "LOGIN";
  payload: LoginInfo;
}

interface LoginSuccessAction {
  type: "LOGIN_SUCCESS";
  payload: UserInfo;
}

interface LogoutAction {
  type: "LOGOUT";
}

interface LogoutSuccessAction {
  type: "LOGOUT_SUCCESS";
}

type KnownAction =
  | InitAuthAction
  | InitAuthCompletedAction
  | SignupAction
  | RequireConfirmationAction
  | ConfirmCodeAction
  | LoginAction
  | LoginSuccessAction
  | LogoutAction
  | LogoutSuccessAction;

export const authActionCreators = {
  initAuth: (): InitAuthAction => ({
    type: "INIT_AUTH",
  }),
  initAuthCompleted: (): InitAuthCompletedAction => ({
    type: "INIT_AUTH_COMPLETED",
  }),
  signup: (info: SignupInfo): SignupAction => ({
    type: "SIGNUP",
    payload: info,
  }),
  requireConfirmation: (
    credential: UserCredential
  ): RequireConfirmationAction => ({
    type: "REQUIRE_CONFIRMATION",
    payload: credential,
  }),
  confirmCode: (info: ConfirmCodeInfo): ConfirmCodeAction => ({
    type: "CONFIRM_CODE",
    payload: info,
  }),
  login: (info: LoginInfo): LoginAction => ({
    type: "LOGIN",
    payload: info,
  }),
  loginSuccess: (info: UserInfo): LoginSuccessAction => ({
    type: "LOGIN_SUCCESS",
    payload: info,
  }),
  logout: (): LogoutAction => ({
    type: "LOGOUT",
  }),
  logoutSuccess: (): LogoutSuccessAction => ({
    type: "LOGOUT_SUCCESS",
  }),
};

export const authMiddleware: Middleware = ({ dispatch }) => (next) => (
  incomingAction
) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "INIT_AUTH") {
    Auth.currentSession()
      .then((session) => {
        console.log("SESSION");
        console.log(session);

        return Auth.currentUserInfo().then((value) => {
          console.log("USER INFO");
          console.log(value);

          dispatch(
            actionCreators.loginSuccess({
              username: value.attributes["email"],
              displayName: "display name",
            })
          );
        });
      })
      .finally(() => {
        dispatch(actionCreators.initAuthCompleted());
      });
  }
  if (action.type === "SIGNUP") {
    const { username, email, password } = action.payload;
    Auth.signUp({
      username: email,
      password,
      attributes: {
        preferred_username: username,
        picture: undefined,
      },
    })
      .then((value) => {
        // SIGNUP SUCCESS
        console.log("SIGNUP SUCCESS");
        console.log(value);
        if (value.userConfirmed) {
          dispatch(
            actionCreators.login({ username, password, rememberMe: false })
          );
        } else {
          dispatch(actionCreators.requireConfirmation({ username, password }));
        }
      })
      .catch((err) => {
        // SIGNUP FAIL
        console.error("SIGNUP FAIL");
        console.error(err);
        if (err.code) {
          // Cognito のエラー
          if (err.code === "UsernameExistsException") {
            dispatch(
              actionCreators.error("サインアップ", "ユーザーが既に存在します。")
            );
          }
        }
      });
  }
  if (action.type === "CONFIRM_CODE") {
    const { username, password, code } = action.payload;
    Auth.confirmSignUp(username, code)
      .then((value) => {
        // SIGNUP SUCCESS
        console.log("SIGNUP SUCCESS");
        console.log(value);
        dispatch(
          actionCreators.login({ username, password, rememberMe: false })
        );
      })
      .catch((err) => {
        // SIGNUP FAIL
        console.error("SIGNUP FAIL");
        console.error(err);
      });
  }
  if (action.type === "LOGIN") {
    const { username, password } = action.payload;
    Auth.signIn({
      username,
      password,
    })
      .then((value) => {
        // LOGIN SUCCESS
        console.log("LOGIN SUCCESS");
        console.log(value);
        dispatch(
          actionCreators.loginSuccess({ username, displayName: "display name" })
        );
      })
      .catch((err) => {
        // LOGIN FAIL
        console.error("LOGIN FAIL");
        console.error(err);
        if (err.code) {
          if (err.code === "UserNotConfirmedException") {
            dispatch(
              actionCreators.requireConfirmation({ username, password })
            );
          }
        }
      });
  }
  if (action.type === "LOGOUT") {
    Auth.signOut()
      .then((value) => {
        // LOGOUT SUCCESS
        console.log("LOGOUT SUCCESS");
        console.log(value);
        dispatch(actionCreators.logoutSuccess());
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
      state: "INITIALIZING",
      credential: undefined,
      user: undefined,
    };
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "INIT_AUTH_COMPLETED":
      if (state.state === "INITIALIZING") {
        return {
          ...state,
          state: "NOT_LOGGED_IN",
        };
      }
      break;
    case "REQUIRE_CONFIRMATION":
      return {
        ...state,
        state: "WAITING_CONFIRM_CODE",
        credential: {
          username: action.payload.username,
          password: action.payload.password,
        },
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        state: "LOGGED_IN",
        credential: undefined,
        userInfo: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        state: "NOT_LOGGED_IN",
        credential: undefined,
        userInfo: undefined,
      };
  }
  return state;
};
