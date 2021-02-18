import { API } from "aws-amplify";
import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState, selectors } from ".";

export interface UserCredential {
  username: string;
  password: string;
}

export interface UserDetailInfo {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  email: string | null;
  area: string | null;
  rating: number | null;
}

export interface UserState {
  data: { [key: string]: UserDetailInfo };
}

export const userSelectors = {
  getUserById: (state: ApplicationState, userId: string) =>
    state.users.data[userId],
};

interface RegisterUserInfo {
  area: string;
  username: string;
  displayName: string;
}

interface RegisterUserInfoAction {
  type: "REGISTER_USER_INFO";
  payload: RegisterUserInfo;
}

interface RegisterUserInfoSuccessAction {
  type: "REGISTER_USER_INFO_SUCCESS";
}

interface RequestUserByIdAction {
  type: "REQUEST_USER_BY_ID";
  payload: string;
}

interface RequestUserByIdSuccessAction {
  type: "REQUEST_USER_BY_ID_SUCCESS";
  payload: UserDetailInfo;
}

type KnownAction =
  | RegisterUserInfoAction
  | RegisterUserInfoSuccessAction
  | RequestUserByIdAction
  | RequestUserByIdSuccessAction;

export const userActionCreators = {
  registerUser: (info: RegisterUserInfo): RegisterUserInfoAction => ({
    type: "REGISTER_USER_INFO",
    payload: info,
  }),
  registerUserSuccess: (): RegisterUserInfoSuccessAction => ({
    type: "REGISTER_USER_INFO_SUCCESS",
  }),
  requestUserById: (userId: string): RequestUserByIdAction => ({
    type: "REQUEST_USER_BY_ID",
    payload: userId,
  }),
  requestUserByIdSuccess: (
    details: UserDetailInfo
  ): RequestUserByIdSuccessAction => ({
    type: "REQUEST_USER_BY_ID_SUCCESS",
    payload: details,
  }),
};

export const userMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "REQUEST_USER_BY_ID") {
    API.get("suteuo", "/users/" + action.payload, {}).then((data) => {
      console.log("REQUEST_USER_BY_ID SUCCESS");
      console.log(data);
      dispatch(actionCreators.requestUserByIdSuccess(data.user));
    });
  }
  if (action.type === "REGISTER_USER_INFO") {
    const user = selectors.getUserInfo(getState())!;
    API.post("suteuo", "/users", {
      body: {
        ...action.payload,
        userId: user.id,
      },
    }).then((data) => {
      console.log("REGISTER_USER_INFO SUCCESS");
      console.log(data);
      dispatch(actionCreators.registerUserSuccess());
    });
  }
};

export const userReducer: Reducer<UserState> = (state, incomingAction) => {
  if (!state) {
    state = {
      data: {},
    };
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_USER_BY_ID_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: action.payload,
        },
      };
  }
  return state;
};
