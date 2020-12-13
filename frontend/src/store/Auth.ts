import { Action, Middleware, Reducer } from "redux";
import { ApplicationState } from ".";
import { findUserById } from "../data";
import { LoginUser } from "../models";


export interface AuthState {
    user: LoginUser | null
}

export const selectors = {
    selectUser: (state: ApplicationState) => state.auth && state.auth.user
}


interface Credential {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginAction {
    type: 'LOGIN';
    payload: Credential
}

export interface GetSessionAction {
    type: 'GET_SESSION';
}

export interface LogoutAction {
    type: 'LOGOUT';
}

export interface ResetPasswordAction {
    type: 'RESET_PASSWORD';
    payload: {
        newPassword: string
    }
}

export interface SetSessionAction {
    type: 'SET_SESSION';
    payload: LoginUser | null
}

export type KnownAction = LoginAction
    | GetSessionAction
    | LogoutAction
    | ResetPasswordAction
    | SetSessionAction;

export const actionCreators = {
    login: (credential: Credential) => ({
        type: "LOGIN",
        payload: credential
    } as LoginAction),
    getSession: () => ({
        type: "GET_SESSION",
    } as GetSessionAction),
    logout: () => ({
        type: "LOGOUT",
    } as LogoutAction),
    resetPassword: (resetPassword: { requestId: string, newPassword: string }) => ({
        type: "RESET_PASSWORD",
        payload: resetPassword
    } as ResetPasswordAction)
};


const middleware: Middleware = ({ dispatch }) => next => incomingAction => {
    next(incomingAction);
    let action = incomingAction as KnownAction;
    switch (action.type) {
        case "LOGIN":
            {
                const user = findUserById('1');
                if (user) {
                    localStorage.setItem('session', JSON.stringify(user));
                    dispatch({
                        type: 'SET_SESSION',
                        payload: user
                    } as SetSessionAction)
                }
            }
            break;
        case "GET_SESSION":
            {
                const sessionData = localStorage.getItem('session');
                if (sessionData) {
                    dispatch({
                        type: 'SET_SESSION',
                        payload: JSON.parse(sessionData)
                    } as SetSessionAction)
                }
            }
            break;
        case "LOGOUT":
            localStorage.removeItem('session');
            dispatch({
                type: 'SET_SESSION',
                payload: null
            } as SetSessionAction)
            break;
    }
}

export const middlewares = [middleware]

export const reducer: Reducer<AuthState, Action> = (state, incomingAction) => {
    if (state === undefined) {
        return {
            user: null,
        }
    }
    const action = incomingAction as KnownAction
    switch (action.type) {
        case "SET_SESSION":
            return {
                ...state,
                user: action.payload
            }
    }
    return state;
}