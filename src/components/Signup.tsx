import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import { ConfirmCodeForm } from "./ConfirmCodeForm";
import { SignupForm } from "./SignupForm";

export type SignupProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Signup = (props: SignupProps) => {
  const { authState, onConfirmCode, onSignup } = props;
  if (authState.state === "WAITING_SIGNUP_CONFIRM") {
    return (
      <ConfirmCodeForm
        username={authState.user!.username}
        onSubmit={onConfirmCode}
      />
    );
  }
  return <SignupForm onSubmit={onSignup} />;
};

const mapStateToProps = (state: ApplicationState) => ({
  authState: selectors.getAuthState(state),
});

const mapDispatchToProps = {
  onSignup: actionCreators.signup,
  onConfirmCode: actionCreators.confirmCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
