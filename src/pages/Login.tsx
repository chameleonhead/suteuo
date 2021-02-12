import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import ConfirmCodeForm from "../components/ConfirmCodeForm";
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";

export type LoginProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Login = (props: LoginProps) => {
  const { authState, onConfirmCode, onLogin } = props;

  return (
    <Layout>
      <h1>ログイン</h1>
      {authState.state === "WAITING_CONFIRM_CODE" ? (
        <ConfirmCodeForm
          credential={authState.credential!}
          onSubmit={onConfirmCode}
        />
      ) : (
        <LoginForm onSubmit={onLogin} />
      )}
      <Link to="/register">サインアップ</Link>
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  authState: selectors.getAuthState(state),
});

const mapDispatchToProps = {
  onLogin: actionCreators.login,
  onConfirmCode: actionCreators.confirmCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
