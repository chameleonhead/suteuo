import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import configureStore from "../redux/configureStore";
import { createMemoryHistory } from "history";

describe("App shell", () => {
  it("ログインせずにアクセスすると未ログイン状態のナビゲーションバーが表示される", async () => {
    render(<App store={configureStore()} history={createMemoryHistory()} />);
    const titleElement = screen.getByText(/捨魚/i);
    expect(titleElement).toBeInTheDocument();
    await waitFor(() => {
      const registerLinkElement = screen.getByText(/新規登録/i);
      expect(registerLinkElement).toBeInTheDocument();
      const loginLinkElement = screen.getByText(/ログイン/i);
      expect(loginLinkElement).toBeInTheDocument();
    });
  });
  it("ログインせずに/にアクセスするとログインしない状態でホームページが表示される", async () => {
    render(<App store={configureStore()} history={createMemoryHistory()} />);
    await waitFor(() => {
      const pageTitleElement = screen.getByText(/Home/i);
      expect(pageTitleElement).toBeInTheDocument();
    });
  });
});
