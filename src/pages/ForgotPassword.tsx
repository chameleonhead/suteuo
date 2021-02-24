import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState } from "../redux";
import Link from "../foundation/Link";
import Layout from "../components/Layout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export type ForgotPasswordProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ForgotPassword = (props: ForgotPasswordProps) => {
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
          <ForgotPasswordForm onSubmit={(value) => {}} />
          <div className="mt-3">
            <Link to="/login">パスワードをご存知の方はこちらからログイン</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
