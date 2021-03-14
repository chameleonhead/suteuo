import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./redux/configureStore";
import Routes from "./Routes";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
