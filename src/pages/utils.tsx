import * as React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ApplicationState, reducers } from "../redux";

export const withContext = (initialState?: ApplicationState) => {
  const store = createStore(reducers, initialState);
  return (story: any) => (
    <Provider store={store}>
      <Router>{story()}</Router>
    </Provider>
  );
};
