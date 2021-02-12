import * as React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import configureStore from "../redux/configureStore";

Amplify.configure(awsExports);

export const withContext = () => {
  return (story: any) => (
    <Provider store={configureStore()}>
      <Router>{story()}</Router>
    </Provider>
  );
};
