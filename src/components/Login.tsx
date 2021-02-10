import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import { ConfirmCodeForm } from "./ConfirmCodeForm";
import { LoginForm } from "./LoginForm";

export type LoginProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Login = (props: LoginProps) => {
  const { authState, onConfirmCode, onLogin } = props;
  console.log(authState);
  if (authState.state === "WAITING_CONFIRM_CODE") {
    return (
      <ConfirmCodeForm
        credential={authState.credential!}
        onSubmit={onConfirmCode}
      />
    );
  }
  return (
    <div>
      <LoginForm onSubmit={onLogin} />
    </div>
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
