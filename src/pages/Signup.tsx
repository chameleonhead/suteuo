import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import SignupForm from "../components/SignupForm";
import Layout from "../components/Layout";

export type SignupProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Signup = (props: SignupProps) => {
  const { state, onInit, onConfirmCode, onSignup } = props;
  React.useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-2">
        <div>
          <div className="mt-3 mb-6">
            <h1 className="text-3xl">新規登録</h1>
            <p className="text-gray-500">新規ユーザーの登録</p>
          </div>
          <SignupForm
            needConfirmation={state.waitingUserConfirmation}
            onSubmit={onSignup}
            onConfirmCode={onConfirmCode}
          />
          <Link to="/login">ログイン</Link>
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
  onSignup: actionCreators.executeSignup,
  onConfirmCode: actionCreators.executeSignupConfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
