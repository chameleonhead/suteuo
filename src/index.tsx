import * as React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "tailwindcss/dist/tailwind.css";
import configureStore from "./redux/configureStore";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <App store={configureStore()} history={createBrowserHistory()} />
  </React.StrictMode>,
  document.getElementById("root")
);
