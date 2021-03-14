import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import configureStore from "../redux/configureStore";

import Login from "./Login";

describe("Login page", () => {
  it("renders with or without a name", async () => {
    render(
      <Provider store={configureStore()}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const input = screen.queryByTestId("username");
      expect(input).toBeInTheDocument();
    });
  });
});
