import { API } from "aws-amplify";
import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState } from ".";

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

interface RequestUserByIdAction {
  type: "REQUEST_USER_BY_ID";
  payload: string;
}

interface RequestUserByIdSuccessAction {
  type: "REQUEST_USER_BY_ID_SUCCESS";
  payload: UserDetailInfo;
}

type KnownAction = RequestUserByIdAction | RequestUserByIdSuccessAction;

export const userActionCreators = {
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

export const userMiddleware: Middleware = ({ dispatch }) => (next) => (
  incomingAction
) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "REQUEST_USER_BY_ID") {
    API.get("suteuo", "/users/" + action.payload, {}).then((data) => {
      console.log("REQUEST_USER_BY_ID SUCCESS");
      console.log(data);
      dispatch(actionCreators.requestUserByIdSuccess(data));
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
