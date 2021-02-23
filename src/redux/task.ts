import { Middleware, Reducer } from "redux";
import { actionCreators, ApplicationState } from ".";

interface Task {
  id: string;
  state: "NOT_INVOKED" | "INVOKING" | "COMPLETED";
  params: any;
  result: any;
}

export interface TaskState {
  [id: string]: Task;
}

export const taskSelectors = {
  getTaskState: (state: ApplicationState) => state.task,
  getTaskById: (state: ApplicationState, id: string) => state.task[id],
};

interface InitTaskAction {
  type: "INIT_TASK";
  payload: {
    taskId: string;
  };
}

interface InvokeTaskAction {
  type: "INVOKE_TASK";
  payload: {
    taskId: string;
    params?: any;
  };
}

interface CompleteTaskAction {
  type: "COMPLETE_TASK";
  payload: {
    taskId: string;
    result: any;
  };
}

interface FinTaskAction {
  type: "FIN_TASK";
  payload: {
    taskId: string;
  };
}

type KnownAction =
  | InitTaskAction
  | InvokeTaskAction
  | CompleteTaskAction
  | FinTaskAction;

export const taskActionCreators = {
  initTask: (taskId: string): InitTaskAction => ({
    type: "INIT_TASK",
    payload: {
      taskId,
    },
  }),
  invokeTask: (taskId: string, params?: any): InvokeTaskAction => ({
    type: "INVOKE_TASK",
    payload: { taskId, params },
  }),
  completeTask: (taskId: string, result: any): CompleteTaskAction => ({
    type: "COMPLETE_TASK",
    payload: {
      taskId,
      result,
    },
  }),
  finTask: (taskId: string): FinTaskAction => ({
    type: "FIN_TASK",
    payload: {
      taskId,
    },
  }),
};

export const taskMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "INVOKE_TASK") {
    setTimeout(() => {
      dispatch(
        actionCreators.completeTask(action.payload.taskId, { success: true })
      );
    });
  }
};

export const taskReducer: Reducer<TaskState> = (state, incomingAction) => {
  if (!state) {
    state = {};
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "INIT_TASK": {
      const { taskId } = action.payload;
      return {
        ...state,
        [taskId]: {
          id: taskId,
          state: "NOT_INVOKED",
          params: undefined,
          result: undefined,
        },
      };
    }
    case "INVOKE_TASK": {
      const { taskId, params } = action.payload;
      const currentTask = state[taskId];
      if (currentTask) {
        return {
          ...state,
          [taskId]: {
            ...currentTask,
            state: "INVOKING",
            params,
          },
        };
      }
      break;
    }
    case "COMPLETE_TASK": {
      const { taskId, result } = action.payload;
      const currentTask = state[taskId];
      if (currentTask) {
        return {
          ...state,
          [taskId]: {
            ...currentTask,
            state: "COMPLETED",
            result,
          },
        };
      }
      break;
    }
    case "FIN_TASK": {
      const { taskId } = action.payload;
      const currentTask = state[taskId];
      if (currentTask) {
        const newState = { ...state };
        delete newState[taskId];
        return newState;
      }
      break;
    }
  }

  return state;
};
