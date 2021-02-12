import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import Layout from "../components/Layout";

export type UserDetailsProps = ContainerProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const UserDetails = (props: UserDetailsProps) => {
  const { userId, details, onInit } = props;
  React.useEffect(() => {
    onInit(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!details) {
    return (
      <Layout>
        <div>読み込み中</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <img
        src={details.avatarUrl || "/assets/nodata.svg"}
        alt={details.displayName + " の画像"}
      />
      <h1>{details.displayName}</h1>
      <div>@{details.username}</div>
      <div>
        <dl>
          <dt>活動場所</dt>
          <dd>{details.area}</dd>
          <dt>評価</dt>
          <dd>{details.rating}</dd>
        </dl>
      </div>
    </Layout>
  );
};

type ContainerProps = {
  userId: string;
};

const mapStateToProps = (
  state: ApplicationState,
  ownProps: ContainerProps,
) => ({
  details: selectors.getUserById(state, ownProps.userId),
});

const mapDispatchToProps = {
  onInit: actionCreators.requestUserById,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
