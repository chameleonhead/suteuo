import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../redux";
import Layout from "../components/Layout";

export type ResetPasswordProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ResetPassword = (props: ResetPasswordProps) => {
  return <Layout>ResetPassword Page</Layout>;
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
