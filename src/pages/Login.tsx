import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import Link from "../foundation/Link";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import ConfirmCodeForm from "../components/ConfirmCodeForm";

export type LoginProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Login = (props: LoginProps) => {
  const { state, onInit, onLogin, onConfirmCode } = props;
  React.useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [credential, setCredential] = React.useState(
    undefined as undefined | { username: string; password: string }
  );

  if (!state) {
    return null;
  }

  return (
    <Layout>
      <div className="md:grid md:grid-cols-2">
        <div>
          <div className="mt-3 mb-6">
            <h1 className="text-3xl">ログイン</h1>
          </div>
          {state.waitingUserConfirmation ? (
            <ConfirmCodeForm
              credential={credential!}
              onSubmit={onConfirmCode}
            />
          ) : (
            <LoginForm
              onSubmit={(value) => {
                setCredential(value);
                onLogin(value);
              }}
            />
          )}
          <div className="mt-3">
            <Link to="/forgotPassword">パスワードを忘れた場合</Link>
          </div>
        </div>
      </div>
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
