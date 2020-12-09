import * as Auth from './Auth';

export interface ApplicationState {
    auth: Auth.AuthState;
}

export const selectors = {
    ...Auth.selectors,
}

export const actionCreators = {
    ...Auth.actionCreators,
}

export const reducers = {
    auth: Auth.reducer,
};

export const middlewares = [
    ...Auth.middlewares
]