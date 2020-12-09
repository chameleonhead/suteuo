import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { actionCreators, ApplicationState, reducers, middlewares } from '.';

export default function configureStore(history: History, initialState?: ApplicationState) {
    const middleware = [
        (store: any) => (next: any) => (action: any) => {
            console.log(action);
            const state = store.getState();
            next(action)
            const newState = store.getState()
            if (state !== newState) {
                console.log(newState)
            }
        },
        thunk,
        routerMiddleware(history),
        ...middlewares,
    ];

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    store.dispatch(actionCreators.getSession());
    return store;
}
