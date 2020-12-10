import * as Auth from './Auth';
import * as Data from './Data';

export interface ApplicationState {
    auth: Auth.AuthState;
    data: Data.DataState;
}

export const selectors = {
    ...Auth.selectors,
    ...Data.selectors,
}

export const actionCreators = {
    ...Auth.actionCreators,
    ...Data.actionCreators,
}

export const reducers = {
    auth: Auth.reducer,
    data: Data.reducer
};

export const middlewares = [
    ...Auth.middlewares
]