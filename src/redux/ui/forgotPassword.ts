import { Middleware } from "redux";
import { actionCreators } from "..";
import { KnownAction as ApiAction } from "../api";

interface ForgotPasswordInfo {
  email: string;
}

interface ResetPasswordInfo {
  email: string;
  code: string;
  newPassword: string;
}

interface ForgotPasswordInitAction {
  type: "FORGOT_PASSWORD_INIT";
}

interface ForgotPasswordExecuteAction {
  type: "FORGOT_PASSWORD_EXECUTE";
  payload: ForgotPasswordInfo;
}

interface ResetPasswordExecute {
  type: "RESET_PASSWORD_EXECUTE";
  payload: ResetPasswordInfo;
}

interface ForgotPasswordSetWaitingUserConfirmation {
  type: "FORGOT_PASSWORD_SET_WAITING_USER_CONFIRMATION";
}

type KnownAction =
  | ForgotPasswordInitAction
  | ForgotPasswordExecuteAction
  | ResetPasswordExecute
  | ForgotPasswordSetWaitingUserConfirmation
  | ApiAction;

export const forgotPasswordActionCreators = {
  initForgotPassword: (): ForgotPasswordInitAction => ({
    type: "FORGOT_PASSWORD_INIT",
  }),
  executeForgotPassword: (
    info: ForgotPasswordInfo
  ): ForgotPasswordExecuteAction => ({
    type: "FORGOT_PASSWORD_EXECUTE",
    payload: info,
  }),
  executeResetPassword: (info: ResetPasswordInfo): ResetPasswordExecute => ({
    type: "RESET_PASSWORD_EXECUTE",
    payload: info,
  }),
  setForgotPasswordWaitingUserConfirmation: (): ForgotPasswordSetWaitingUserConfirmation => ({
    type: "FORGOT_PASSWORD_SET_WAITING_USER_CONFIRMATION",
  }),
};

export const forgotPasswordMiddleware: Middleware = ({
  dispatch,
  getState,
}) => (next) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "FORGOT_PASSWORD_INIT") {
    dispatch(
      actionCreators.initPage("FORGOT_PASSWORD", {
        waitingUserConfirmation: false,
      })
    );
  }
  if (action.type === "FORGOT_PASSWORD_SET_WAITING_USER_CONFIRMATION") {
    dispatch(
      actionCreators.updatePage("FORGOT_PASSWORD", {
        waitingUserConfirmation: true,
      })
    );
  }
  if (action.type === "FORGOT_PASSWORD_EXECUTE") {
    dispatch(
      actionCreators.api(action.type, "FORGOT_PASSWORD", {
        username: action.payload.email,
      })
    );
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FORGOT_PASSWORD_EXECUTE"
  ) {
    dispatch(actionCreators.setForgotPasswordWaitingUserConfirmation());
  }
  if (
    action.type === "API_FAILED" &&
    action.meta.returnAddress === "FORGOT_PASSWORD_EXECUTE"
  ) {
    console.error("登録に失敗しました。");
  }
  if (action.type === "RESET_PASSWORD_EXECUTE") {
    dispatch(
      actionCreators.api(
        action.type,
        "RESET_PASSWORD",
        {
          username: action.payload.email,
          password: action.payload.newPassword,
          code: action.payload.code,
        },
        {
          username: action.payload.email,
          password: action.payload.newPassword,
        }
      )
    );
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "RESET_PASSWORD_EXECUTE"
  ) {
    dispatch(
      actionCreators.login({
        username: action.meta.username,
        password: action.meta.password,
      })
    );
  }
};
