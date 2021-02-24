import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import Link from "../foundation/Link";
import Layout from "../components/Layout";
import SignupForm from "../components/SignupForm";
import ConfirmCodeForm from "../components/ConfirmCodeForm";

export type SignupProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Signup = (props: SignupProps) => {
  const { state, onInit, onConfirmCode, onSignup } = props;
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
            <h1 className="text-3xl">新規登録</h1>
            <p className="text-gray-500">捨魚にようこそ</p>
          </div>
          {state.waitingUserConfirmation ? (
            <ConfirmCodeForm
              credential={credential!}
              onSubmit={onConfirmCode}
            />
          ) : (
            <SignupForm
              onSubmit={(value) => {
                setCredential({
                  username: value.email,
                  password: value.password,
                });
                onSignup(value);
              }}
            />
          )}
          <div className="mt-3">
            <Link to="/login">アカウントをお持ちの場合</Link>
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
  onSignup: actionCreators.executeSignup,
  onConfirmCode: actionCreators.executeSignupConfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
