import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../redux";
import Layout from "../components/Layout";

export type HomeProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Home = (props: HomeProps) => {
  return <Layout>Home Page</Layout>;
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
