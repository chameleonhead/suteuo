import { applyMiddleware, compose, createStore } from "redux";
import { reducers, middlewares, ApplicationState, actionCreators } from ".";

const configureStore = (initialState?: ApplicationState) => {
  const enhancers = [];
  const windowIfDefined =
    typeof window === "undefined" ? null : (window as any);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );
  
  store.dispatch(actionCreators.initAuth());
  return store;
};

export default configureStore;
