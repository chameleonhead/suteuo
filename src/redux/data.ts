import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState, selectors } from ".";
import { KnownAction as ApiAction } from "./api";

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
  email: string | null;
  area: string | null;
  rating: number | null;
}

interface UsersDataState {
  list: string[];
  entities: { [id: string]: User };
}
interface MessageRoom {
  id: string;
  participants: string[];
}

interface MessageRoomDataState {
  list: string[];
  entities: { [id: string]: MessageRoom };
}

interface Message {
  id: string;
  roomId: string;
  timestamp: string;
  sender: string;
  text: string;
}

interface MessageDataState {
  listByRoomId: { [roomId: string]: string[] };
  entities: { [id: string]: Message };
}

interface Notification {
  id: string;
  timestamp: string;
  type: string;
  payload: object;
}

interface NotificationDataState {
  list: string[];
  entities: { [id: string]: Notification };
}

export interface DataState {
  users: UsersDataState;
  messageRooms: MessageRoomDataState;
  messages: MessageDataState;
  notifications: NotificationDataState;
}

export const dataSelectors = {
  getDataState: (state: ApplicationState) => state.data,
  getUsers: (state: ApplicationState) =>
    state.data.users.list.map((item) => selectors.getUserById(state, item)),

  getUserById: (state: ApplicationState, id: string) =>
    state.data.users.entities[id],
  getMessageRoomById: (state: ApplicationState, id: string) =>
    state.data.messageRooms.entities[id] && {
      ...state.data.messageRooms.entities[id],
      participants: state.data.messageRooms.entities[id].participants.map((u) =>
        selectors.getUserById(state, u)
      ),
    },
  getMessageRooms: (state: ApplicationState) =>
    state.data.messageRooms.list.map((item) =>
      selectors.getMessageRoomById(state, item)
    ),
  getMessageById: (state: ApplicationState, id: string) =>
    state.data.messages.entities[id] && {
      ...state.data.messages.entities[id],
      sender: selectors.getUserById(
        state,
        state.data.messages.entities[id].sender
      ),
    },
  getMessagesByRoomId: (state: ApplicationState, roomId: string) =>
    state.data.messages.listByRoomId[roomId]
      ? state.data.messages.listByRoomId[roomId].map((item) =>
          selectors.getMessageById(state, item)
        )
      : [],
  getNotification: (state: ApplicationState, id: string) =>
    state.data.notifications.entities[id],
  getNotifications: (state: ApplicationState) =>
    state.data.notifications.list.map((id) =>
      selectors.getNotification(state, id)
    ),
};

interface ListInfo<T> {
  totalCount: number;
  items: T[];
}
interface ClearDataAction {
  type: "CLEAR_DATA";
}

interface FetchUsersAction {
  type: "FETCH_USERS";
  payload: {
    query: string;
  };
}

interface SetUsersAction {
  type: "SET_USERS";
  payload: ListInfo<User>;
}

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

interface FetchMessageRoomsAction {
  type: "FETCH_MESSAGE_ROOMS";
}

interface SetMessageRoomsAction {
  type: "SET_MESSAGE_ROOMS";
  payload: ListInfo<MessageRoom>;
}

interface FetchMessagesAction {
  type: "FETCH_MESSAGES";
  payload: {
    roomId: string;
  };
}

interface SetMessagesAction {
  type: "SET_MESSAGES";
  payload: ListInfo<Message>;
}

interface FetchNotificationsAction {
  type: "FETCH_NOTIFICATIONS";
}

interface SetNotificationsAction {
  type: "SET_NOTIFICATIONS";
  payload: ListInfo<Notification>;
}

type KnownAction =
  | ClearDataAction
  | FetchUsersAction
  | SetUsersAction
  | FetchUserAction
  | SetUserAction
  | FetchMessageRoomsAction
  | SetMessageRoomsAction
  | FetchMessagesAction
  | SetMessagesAction
  | FetchNotificationsAction
  | SetNotificationsAction
  | ApiAction;

export const dataActionCreators = {
  clearData: (): ClearDataAction => ({
    type: "CLEAR_DATA",
  }),
  fetchUsers: (query: string = ""): FetchUsersAction => ({
    type: "FETCH_USERS",
    payload: {
      query,
    },
  }),
  setUsers: (info: { totalCount: number; items: User[] }): SetUsersAction => ({
    type: "SET_USERS",
    payload: info,
  }),
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
  fetchMessageRooms: (): FetchMessageRoomsAction => ({
    type: "FETCH_MESSAGE_ROOMS",
  }),
  setMessageRooms: (info: ListInfo<MessageRoom>): SetMessageRoomsAction => ({
    type: "SET_MESSAGE_ROOMS",
    payload: info,
  }),
  fetchMessages: (roomId: string): FetchMessagesAction => ({
    type: "FETCH_MESSAGES",
    payload: {
      roomId,
    },
  }),
  setMessages: (info: ListInfo<Message>): SetMessagesAction => ({
    type: "SET_MESSAGES",
    payload: info,
  }),
  fetchNotifications: (): FetchNotificationsAction => ({
    type: "FETCH_NOTIFICATIONS",
  }),
  setNotifications: (info: ListInfo<Notification>): SetNotificationsAction => ({
    type: "SET_NOTIFICATIONS",
    payload: info,
  }),
};

export const dataMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "FETCH_USERS") {
    dispatch(actionCreators.api(action.type, "GET_USERS", action.payload));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FETCH_USERS"
  ) {
    dispatch(actionCreators.setUsers(action.payload));
  }
  if (action.type === "FETCH_USER") {
    dispatch(actionCreators.api(action.type, "GET_USER", action.payload));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FETCH_USER"
  ) {
    dispatch(actionCreators.setUser(action.payload.user));
  }
  if (action.type === "FETCH_MESSAGE_ROOMS") {
    dispatch(actionCreators.api(action.type, "GET_MESSAGE_ROOMS"));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FETCH_MESSAGE_ROOMS"
  ) {
    dispatch(actionCreators.setMessageRooms(action.payload));
  }
  if (action.type === "FETCH_MESSAGES") {
    dispatch(actionCreators.api(action.type, "GET_MESSAGES", action.payload));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FETCH_MESSAGES"
  ) {
    dispatch(actionCreators.setMessages(action.payload));
  }
  if (action.type === "FETCH_NOTIFICATIONS") {
    dispatch(actionCreators.api(action.type, "GET_NOTIFICATIONS"));
  }
  if (
    action.type === "API_SUCCEEDED" &&
    action.meta.returnAddress === "FETCH_NOTIFICATIONS"
  ) {
    dispatch(actionCreators.setNotifications(action.payload));
  }
};

const initialValue = {
  users: { entities: {}, list: [] } as UsersDataState,
  messages: { entities: {}, listByRoomId: {} } as MessageDataState,
  messageRooms: { entities: {}, list: [] } as MessageRoomDataState,
  notifications: { entities: {}, list: [] } as NotificationDataState,
};

export const dataReducer: Reducer<DataState> = (state, incomingAction) => {
  if (!state) {
    state = initialValue;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "CLEAR_DATA": {
      return initialValue;
    }
    case "SET_USERS": {
      const { items } = action.payload;
      const list = [] as string[];
      const entities = {} as { [id: string]: User };
      for (const item of items) {
        list.push(item.id);
        entities[item.id] = item;
      }
      return {
        ...state,
        users: {
          ...state.users,
          list: list,
          entities: {
            ...state.users.entities,
            ...entities,
          },
        },
      };
    }
    case "SET_USER": {
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
    }
    case "SET_MESSAGE_ROOMS": {
      const { items } = action.payload;
      if (items.length) {
        const list = [] as string[];
        const entities = {} as { [id: string]: MessageRoom };
        for (const item of items) {
          list.push(item.id);
          entities[item.id] = item;
        }
        return {
          ...state,
          messageRooms: {
            ...state.messageRooms,
            list: list,
            entities: {
              ...state.messageRooms.entities,
              ...entities,
            },
          },
        };
      }
      break;
    }
    case "SET_MESSAGES": {
      const { items } = action.payload;
      if (items.length > 0) {
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
            listByRoomId: {
              ...state.messages.listByRoomId,
              [items[0].roomId]: list,
            },
            entities: {
              ...state.messages.entities,
              ...entities,
            },
          },
        };
      }
      break;
    }
    case "SET_NOTIFICATIONS": {
      const { items } = action.payload;
      if (items.length > 0) {
        const list = [] as string[];
        const entities = {} as { [id: string]: Notification };
        for (const notification of items) {
          list.push(notification.id);
          entities[notification.id] = notification;
        }
        return {
          ...state,
          notifications: {
            ...state.notifications,
            list,
            entities: {
              ...state.notifications.entities,
              ...entities,
            },
          },
        };
      }
      break;
    }
  }

  return state;
};
