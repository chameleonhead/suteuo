import { API, Auth } from "aws-amplify";
import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState } from ".";

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
        fetchTask = Auth.signUp({
          username: params.email,
          password: params.password,
          attributes: {
            name: params.name,
          },
        });
        break;
      case "CONFIRM_CODE":
        fetchTask = Auth.confirmSignUp(params.username, params.code);
        break;
      case "LOGIN":
        fetchTask = Auth.signIn({
          username: params.username,
          password: params.password,
        });
        break;
      case "SESSION":
        Auth.currentSession()
          .then((_) => {
            return Auth.currentUserInfo();
          })
          .then((value) => {
            if (value.username) {
              dispatch(
                actionCreators.apiSuccess(
                  {
                    id: value.attributes["sub"],
                    name: value.attributes["name"],
                    email: value.attributes["email"],
                  },
                  action.meta
                )
              );
            } else {
              dispatch(actionCreators.apiSuccess(undefined, action.meta));
            }
          })
          .catch((_) => {
            dispatch(actionCreators.apiSuccess(undefined, action.meta));
          });
        break;
      case "LOGOUT":
        fetchTask = new Promise((resolve) => {
          setTimeout(() => {
            resolve(Auth.signOut());
          }, 1000);
        });
        break;
      case "FORGOT_PASSWORD":
        fetchTask = Auth.forgotPassword(action.payload.params.username);
        break;
      case "RESET_PASSWORD":
        fetchTask = Auth.forgotPasswordSubmit(
          action.payload.params.username,
          action.payload.params.code,
          action.payload.params.password
        );
        break;
      case "GET_USERS":
        fetchTask = API.get(
          "suteuorest",
          "/users?q=" + encodeURIComponent(params.query || ""),
          {}
        );
        break;
      case "GET_USER":
        fetchTask = API.get("suteuorest", "/users/" + params.userId, {});
        break;
      case "GET_MESSAGE_ROOMS":
        fetchTask = API.get("suteuorest", "/messaging/rooms", {});
        break;
      case "GET_MESSAGES":
        fetchTask = API.get(
          "suteuorest",
          `/messaging/rooms/${params.roomId}/messages`,
          {}
        );
        break;
      case "POST_MESSAGE":
        fetchTask = API.post("suteuorest", `/messaging/messages`, {
          body: params,
        });
        break;
      case "GET_NOTIFICATIONS":
        fetchTask = API.get("suteuorest", "/notifications", {});
        break;
      case "POST_NOTIFICATION_READ":
        fetchTask = API.post(
          "suteuorest",
          `/notifications/${params.notificationId}/read`,
          {}
        );
        break;
    }
    if (fetchTask) {
      fetchTask
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
