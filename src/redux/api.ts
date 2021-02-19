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

    switch (name) {
      case "REGISTER":
        Auth.signUp({
          username: params.email,
          password: params.password,
          attributes: {
            preferred_username: undefined,
            picture: undefined,
          },
        })
          .then((data) => {
            dispatch(actionCreators.apiSuccess(data, action.meta));
          })
          .catch((error) => {
            dispatch(actionCreators.apiFail(error, action.meta));
          });
        break;
      case "CONFIRM_CODE":
        Auth.confirmSignUp(params.username, params.code)
          .then((data) => {
            dispatch(
              actionCreators.apiSuccess(data, { ...action.meta, ...params })
            );
          })
          .catch((error) => {
            dispatch(actionCreators.apiFail(error, action.meta));
          });
        break;
      case "LOGIN":
        Auth.signIn({
          username: params.username,
          password: params.password,
        })
          .then((data) => {
            dispatch(actionCreators.apiSuccess(data, action.meta));
          })
          .catch((error) => {
            dispatch(actionCreators.apiFail(error, action.meta));
          });
        break;
      case "SESSION":
        Auth.currentSession()
          .then((_) => {
            return Auth.currentUserInfo();
          })
          .then((value) => {
            if (value.username) {
              console.log(value);
              dispatch(
                actionCreators.apiSuccess(
                  {
                    id: value.attributes["sub"],
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
        Auth.signOut()
          .then((data) => {
            actionCreators.apiSuccess(data, action.meta);
          })
          .catch((error) => {
            actionCreators.apiFail(error, action.meta);
          });
        break;
      case "GET_USER":
        API.get("suteuo", "/users/" + params.userId, {})
          .then((data) => {
            actionCreators.apiSuccess(data, action.meta);
          })
          .catch((error) => {
            actionCreators.apiFail(error, action.meta);
          });
        break;
      case "GET_MESSAGES":
        API.get("suteuo", "/messaging", {})
          .then((data) => {
            actionCreators.apiSuccess(data, action.meta);
          })
          .catch((error) => {
            actionCreators.apiFail(error, action.meta);
          });
        break;
      case "POST_MESSAGE":
        API.post("suteuo", "/messaging", params)
          .then((data) => {
            actionCreators.apiSuccess(data, action.meta);
          })
          .catch((error) => {
            actionCreators.apiFail(error, action.meta);
          });
        break;
    }
  }
};

export const apiReducer: Reducer<ApiState> = (state, incomingAction) => {
  if (!state) {
    state = {};
  }
  return state;
};
