import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState } from "../redux";
import Layout from "../components/Layout";
import UserInfoForm from "../components/UserInfoForm";

export type InitUserProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const InitUser = (props: InitUserProps) => {
  const { onRegisterUser } = props;
  return (
    <Layout>
      <h1>初期ユーザー情報を登録</h1>
      <div>
        <UserInfoForm onSubmit={onRegisterUser} />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = {
  onRegisterUser: actionCreators.registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitUser);
