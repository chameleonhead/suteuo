import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";

export type LoginProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Login = (props: LoginProps) => {
  const { state, onInit, onLogin, onConfirmCode } = props;
  React.useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="mt-3 mb-6">
        <h1 className="text-3xl">ログイン</h1>
      </div>
      <LoginForm
        needConfirmation={state.waitingUserConfirmation}
        onSubmit={onLogin}
        onConfirmCode={onConfirmCode}
      />
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  state: selectors.getSignupState(state),
});

const mapDispatchToProps = {
  onInit: actionCreators.initSignup,
  onLogin: actionCreators.login,
  onConfirmCode: actionCreators.executeSignupConfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
