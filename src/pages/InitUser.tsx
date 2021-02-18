import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import Layout from "../components/Layout";
import UserInfoForm from "../components/UserInfoForm";

export type InitUserProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const InitUser = (props: InitUserProps) => {
  const { user, onRegisterUser } = props;
  return (
    <Layout>
      <h1>初期ユーザー情報を登録</h1>
      <div>
        <UserInfoForm userId={user?.id || ""} onSubmit={onRegisterUser} />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  user: selectors.getUserInfo(state),
});

const mapDispatchToProps = {
  onRegisterUser: actionCreators.registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitUser);
