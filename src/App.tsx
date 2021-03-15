import * as React from "react";
import { Router } from "react-router-dom";
import { History } from "history";
import { Provider } from "react-redux";

import Routes from "./Routes";
import { Store } from "redux";
import { ApplicationState } from "./redux";

export type AppProps = {
  store: Store<ApplicationState>;
  history: History;
};

export const App = (props: AppProps) => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
};

export default App;
