import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState, selectors } from ".";
import { KnownAction as ApiAction } from "./api";

interface User {
  id: string;
  username: string;
  nickname: string;
  avatarUrl: string | null;
  email: string | null;
  area: string | null;
  rating: number | null;
}

interface UsersDataState {
  entities: { [id: string]: User };
}
interface Message {
  id: string;
  body: string;
  sender: string;
  createdAt: string;
}

interface MessageDataState {
  list: string[];
  entities: { [id: string]: Message };
}

export interface DataState {
  users: UsersDataState;
  messages: MessageDataState;
}

export const dataSelectors = {
  getDataState: (state: ApplicationState) => state.data,
  getUserById: (state: ApplicationState, id: string) =>
    state.data.users.entities[id],
  getMessageById: (state: ApplicationState, id: string) =>
    state.data.messages.entities[id],
  getMessages: (state: ApplicationState) =>
    state.data.messages.list.map((item) =>
      selectors.getMessageById(state, item)
    ),
};

interface FetchUserAction {
  type: "FETCH_USER";
  payload: {
    userId: string;
  };
}

interface SetUserAction {
  type: "SET_USER";
  payload: {
    user: User;
  };
}

interface FetchMessagesAction {
  type: "FETCH_MESSAGES";
}

interface SetMessagesAction {
  type: "SET_MESSAGES";
  payload: {
    items: Message[];
  };
}

type KnownAction =
  | FetchUserAction
  | SetUserAction
  | FetchMessagesAction
  | SetMessagesAction
  | ApiAction;

export const dataActionCreators = {
  fetchUser: (userId: string): FetchUserAction => ({
    type: "FETCH_USER",
    payload: {
      userId,
    },
  }),
  setUser: (user: User): SetUserAction => ({
    type: "SET_USER",
    payload: { user },
  }),
  fetchMessages: (): FetchMessagesAction => ({
    type: "FETCH_MESSAGES",
  }),
  setMessages: (info: {
    totalCount: number;
    items: Message[];
  }): SetMessagesAction => ({
    type: "SET_MESSAGES",
    payload: info,
  }),
};

export const dataMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "FETCH_USER") {
    dispatch(actionCreators.api(action.type, "GET_USER", action.payload));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FETCH_USER"
  ) {
    dispatch(actionCreators.setUser(action.payload.user));
  }
  if (action.type === "FETCH_MESSAGES") {
    dispatch(
      actionCreators.api(action.type, "GET_MESSAGES", {
        roomId: "4c737d7c-afd7-4157-bf6a-c89f5971f529",
      })
    );
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FETCH_MESSAGES"
  ) {
    dispatch(actionCreators.setMessages(action.payload));
  }
};

export const dataReducer: Reducer<DataState> = (state, incomingAction) => {
  if (!state) {
    state = {
      users: { entities: {} } as UsersDataState,
      messages: { entities: {}, list: [] } as MessageDataState,
    };
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "SET_USER":
      const { user } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          entities: {
            ...state.users.entities,
            [user.id]: user,
          },
        },
      };
    case "SET_MESSAGES":
      const { items } = action.payload;
      const list = [] as string[];
      const entities = {} as { [id: string]: Message };
      for (const message of items) {
        list.push(message.id);
        entities[message.id] = message;
      }
      return {
        ...state,
        messages: {
          ...state.messages,
          list: list,
          entities: {
            ...state.messages.entities,
            ...entities,
          },
        },
      };
  }

  return state;
};
