import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import ConfirmCodeForm from "../components/ConfirmCodeForm";
import SignupForm from "../components/SignupForm";
import Layout from "../components/Layout";

export type SignupProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Signup = (props: SignupProps) => {
  const { authState, onConfirmCode, onSignup } = props;

  return (
    <Layout>
      <h1>サインアップ</h1>
      {authState.state === "WAITING_CONFIRM_CODE" ? (
        <ConfirmCodeForm
          credential={authState.credential!}
          onSubmit={onConfirmCode}
        />
      ) : (
        <SignupForm onSubmit={onSignup} />
      )}
      <Link to="/login">ログイン</Link>
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  authState: selectors.getAuthState(state),
});

const mapDispatchToProps = {
  onSignup: actionCreators.signup,
  onConfirmCode: actionCreators.confirmCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
