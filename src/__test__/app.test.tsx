import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import configureStore from "../redux/configureStore";
import { createMemoryHistory } from "history";
import services from "../services";
jest.mock("../services");

describe("App shell", () => {
  it("ログインせずにアクセスすると未ログイン状態のナビゲーションバーが表示される", async () => {
    services.session = jest.fn().mockReturnValue(Promise.resolve(null));
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
  it("ログインしてアクセスするとログイン状態のナビゲーションバーが表示される", async () => {
    services.session = jest.fn().mockReturnValue(
      Promise.resolve({
        user: { id: "testid", email: "test@example.com", name: "User Name" },
      })
    );
    render(<App store={configureStore()} history={createMemoryHistory()} />);
    const titleElement = screen.getByText(/捨魚/i);
    expect(titleElement).toBeInTheDocument();
    await waitFor(() => {
      const messageLinkElement = screen.getByText(/メッセージ/i);
      expect(messageLinkElement).toBeInTheDocument();
      const notificationLinkElement = screen.getByText(/通知/i);
      expect(notificationLinkElement).toBeInTheDocument();

      const userLinkElement = screen.getByText(/User Name/i);
      expect(userLinkElement).toBeInTheDocument();
    });
  });
  it("ログインせずに/にアクセスするとログインしない状態でホームページが表示される", async () => {
    services.session = jest.fn().mockReturnValue(Promise.resolve(null));
    render(<App store={configureStore()} history={createMemoryHistory()} />);
    await waitFor(() => {
      const pageTitleElement = screen.getByText(/Home/i);
      expect(pageTitleElement).toBeInTheDocument();
    });
  });
  it("ログインせずに/registerにアクセスすると新規登録画面が表示される", async () => {
    services.session = jest.fn().mockReturnValue(Promise.resolve(null));
    const history = createMemoryHistory();
    history.push("/register");
    render(<App store={configureStore()} history={history} />);
    await waitFor(() => {
      const pageTitleElement = screen.getByText(/新規登録/i, {
        selector: "h1",
      });
      expect(pageTitleElement).toBeInTheDocument();
      expect(screen.getByTestId("name")).toBeInTheDocument();
      expect(screen.getByTestId("email")).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
    });
  });
  it("/registerで存在しないユーザーを新規登録すると確認コードの入力テキストが表示される", async () => {
    services.session = jest.fn().mockReturnValue(Promise.resolve(null));
    services.register = jest.fn().mockReturnValue(Promise.resolve({}));
    const history = createMemoryHistory();
    history.push("/register");
    render(<App store={configureStore()} history={history} />);
    await waitFor(() => {
      const pageTitleElement = screen.getByText(/新規登録/i, {
        selector: "h1",
      });
      expect(pageTitleElement).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "New User Name" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "P@ssw0rd" },
    });
    fireEvent.click(screen.getByText("登録"));
    await waitFor(() => {
      expect(screen.getByTestId("code")).toBeInTheDocument();
    });
  });
  it("/registerですでに存在するユーザーを登録するとエラーメッセージが表示される", async () => {
    services.session = jest.fn().mockReturnValue(Promise.resolve(null));
    services.register = jest
      .fn()
      .mockReturnValue(
        Promise.reject({ statucCode: 400, code: "UsernameExistsException" })
      );
    const history = createMemoryHistory();
    history.push("/register");
    render(<App store={configureStore()} history={history} />);
    await waitFor(() => {
      const pageTitleElement = screen.getByText(/新規登録/i, {
        selector: "h1",
      });
      expect(pageTitleElement).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "New User Name" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "P@ssw0rd" },
    });
    fireEvent.click(screen.getByText("登録"));
    await waitFor(() => {
      expect(
        screen.getByText(/既に登録済みのユーザーです。/i)
      ).toBeInTheDocument();
    });
  });
  it("/registerで存在しないユーザーを新規登録し確認コードの入力を行うとログイン処理が実行される", async () => {
    services.session = jest.fn().mockReturnValue(Promise.resolve(null));
    services.register = jest.fn().mockReturnValue(Promise.resolve({}));
    services.confirmRegister = jest.fn().mockReturnValue(Promise.resolve({}));
    services.login = jest.fn();
    const history = createMemoryHistory();
    history.push("/register");
    render(<App store={configureStore()} history={history} />);
    await waitFor(() => {
      const pageTitleElement = screen.getByText(/新規登録/i, {
        selector: "h1",
      });
      expect(pageTitleElement).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "New User Name" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "P@ssw0rd" },
    });
    fireEvent.click(screen.getByText("登録"));
    await waitFor(() => {
      expect(screen.getByTestId("code")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("code"), {
      target: { value: "code" },
    });
    fireEvent.click(screen.getByText("送信"));
    await waitFor(() => {
      expect(services.login).toBeCalledWith(
        expect.objectContaining({
          username: "newuser@example.com",
          password: "P@ssw0rd",
        })
      );
    });
  });
});
