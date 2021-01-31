import { combineReducers, Middleware, Reducer } from "redux";
import { authMiddleware, authReducer, AuthState } from "./auth";

export interface ApplicationState {
  auth: AuthState;
}

export const middlewares = [
  ((store) => (next) => (action) => {
    const state = store.getState();
    console.log(action);
    next(action);
    const stateAfter = store.getState();
    if (state !== stateAfter) {
      console.log(stateAfter);
    }
  }) as Middleware,
  authMiddleware,
];

export const reducers: Reducer<ApplicationState> = combineReducers({
  auth: authReducer,
});
