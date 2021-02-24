import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../redux";
import Layout from "../components/Layout";

export type ForgotPasswordProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ForgotPassword = (props: ForgotPasswordProps) => {
  return <Layout>ForgotPassword Page</Layout>;
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
