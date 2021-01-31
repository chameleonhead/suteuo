import { applyMiddleware, createStore } from "redux";
import { reducers, middlewares, ApplicationState } from ".";

const configureStore = (initialState?: ApplicationState) =>
  createStore(reducers, initialState, applyMiddleware(...middlewares));

export default configureStore;
