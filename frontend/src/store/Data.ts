import { Action, Middleware, Reducer } from "redux";
import { ApplicationState } from ".";

export interface DataState {
}

export const selectors = {
    selectUnreadNotificationCount: (state: ApplicationState) => 1,
    selectUnreadMessageCount: (state: ApplicationState) => 2,
}

export type KnownAction = {};

export const actionCreators = {
}

export const middleware: Middleware = store => next => action => {
    next(action);
}

export const reducer: Reducer<DataState, Action> = (state, incomingAction) => {
    if (!state) {
        return {
        }
    }
    return state;
}