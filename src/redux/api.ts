import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState } from ".";
import services from "../services";

export interface ApiState {}

export const apiSelectors = {
  getApiState: (state: ApplicationState) => state.api,
};

interface ApiRequest {
  name: string;
  params?: any;
}

type ApiRequestMetaData = {
  returnAddress?: string;
} & any;

interface ApiError {
  statusCode: number;
  code: string;
  message: string;
  retryable: boolean;
  error?: any;
}

interface ApiAction {
  type: "API";
  payload: ApiRequest;
  meta: ApiRequestMetaData;
}

interface ApiSucceededAction {
  type: "API_SUCCEEDED";
  payload: any;
  meta: ApiRequestMetaData;
}

interface ApiFailedAction {
  type: "API_FAILED";
  payload: ApiError;
  meta: ApiRequestMetaData;
}

export type KnownAction = ApiAction | ApiSucceededAction | ApiFailedAction;

export const apiActionCreators = {
  api: (
    returnAddress: string,
    name: string,
    params?: any,
    meta?: any
  ): ApiAction => ({
    type: "API",
    payload: {
      name,
      params,
    },
    meta: {
      ...meta,
      returnAddress,
    },
  }),
  apiSuccess: (data: any, meta: ApiRequestMetaData): ApiSucceededAction => ({
    type: "API_SUCCEEDED",
    payload: data,
    meta,
  }),
  apiFail: (error: any, meta: ApiRequestMetaData): ApiFailedAction => ({
    type: "API_FAILED",
    payload: error,
    meta,
  }),
};

export const apiMiddleware: Middleware = ({ dispatch }) => (next) => (
  incomingAction
) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "API") {
    const { name, params } = action.payload;

    let fetchTask = undefined;
    switch (name) {
      case "REGISTER":
        fetchTask = services.register(params);
        break;
      case "CONFIRM_CODE":
        fetchTask = services.confirmRegister(params);
        break;
      case "LOGIN":
        fetchTask = services.login(params);
        break;
      case "SESSION":
        fetchTask = services.session();
        break;
      case "LOGOUT":
        fetchTask = services.logout();
        break;
      case "FORGOT_PASSWORD":
        fetchTask = services.forgotPassword(params);
        break;
      case "RESET_PASSWORD":
        fetchTask = services.resetPassword(params);
        break;
      case "CHANGE_PASSWORD":
        fetchTask = services.changePassword(params);
        break;
      case "GET_USERS":
        fetchTask = services.getUsers(params);
        break;
      case "GET_USER":
        fetchTask = services.getUsers(params);
        break;
      case "GET_MESSAGE_ROOMS":
        fetchTask = services.getMessageRooms(params);
        break;
      case "GET_MESSAGES":
        fetchTask = services.getMessagesInMessageRoom(params);
        break;
      case "POST_MESSAGE":
        fetchTask = services.postMessage(params);
        break;
      case "GET_NOTIFICATIONS":
        fetchTask = services.getNotifications(params);
        break;
      case "POST_NOTIFICATION_READ":
        fetchTask = services.postNotificationRead(params);
        break;
    }
    if (fetchTask) {
      (fetchTask as Promise<any>)
        .then((data) => {
          dispatch(actionCreators.apiSuccess(data, action.meta));
        })
        .catch((error) => {
          dispatch(actionCreators.apiFail(error, action.meta));
        });
    }
  }
};

export const apiReducer: Reducer<ApiState> = (state, _) => {
  if (!state) {
    state = {};
  }
  return state;
};
