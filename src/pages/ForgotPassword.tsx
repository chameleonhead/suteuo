import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import Link from "../foundation/Link";
import Layout from "../components/Layout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

export type ForgotPasswordProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const { state, onInit, onForgotPassword, onResetPassword } = props;
  React.useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [email, setEmail] = React.useState(undefined as undefined | string);

  if (!state) {
    return null;
  }
  if (state.waitingUserConfirmation) {
    return (
      <Layout>
        <div className="md:grid md:grid-cols-2">
          <div>
            <div className="mt-3 mb-6">
              <h1 className="text-3xl">パスワードリセット</h1>
              <p className="text-gray-500">
                登録済みのメールアドレスに送信されたコードを入力し、新しいパスワードを入力してください
              </p>
            </div>
            <ResetPasswordForm email={email!} onSubmit={onResetPassword} />
            <div className="mt-3">
              <Link to="/login">
                パスワードをご存知の方はこちらからログイン
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="md:grid md:grid-cols-2">
        <div>
          <div className="mt-3 mb-6">
            <h1 className="text-3xl">パスワードリセット</h1>
            <p className="text-gray-500">
              パスワードを忘れた場合は登録時のメールアドレスを使用して再設定が可能です
            </p>
          </div>
          <ForgotPasswordForm
            onSubmit={(value) => {
              setEmail(value.email);
              onForgotPassword(value);
            }}
          />
          <div className="mt-3">
            <Link to="/login">パスワードをご存知の方はこちらからログイン</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  state: selectors.getForgotPasswordState(state),
});

const mapDispatchToProps = {
  onInit: actionCreators.initForgotPassword,
  onForgotPassword: actionCreators.executeForgotPassword,
  onResetPassword: actionCreators.executeResetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
