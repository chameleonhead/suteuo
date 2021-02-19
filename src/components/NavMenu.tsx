import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";

export type NavMenuProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const NavMenu = (props: NavMenuProps) => {
  const { auth, onLogout } = props;
  return (
    <nav>
      <h1>
        <Link to="/">捨魚</Link>
      </h1>
      {auth.state === "LOGGED_IN" ? (
        <div>
          <ul>
            <li>
              <Link to="/messaging">メッセージ</Link>
            </li>
          </ul>
          <div>
            <Link to={"/users/" + auth.user!.id}>
              {auth.user?.displayName || "未設定"}
            </Link>
            <button type="button" onClick={onLogout}>
              ログアウト
            </button>
          </div>
        </div>
      ) : null}
      {auth.state === "NOT_LOGGED_IN" ? (
        <ul>
          <li>
            <Link to="/register">サインアップ</Link>
          </li>
          <li>
            <Link to="/login">ログイン</Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  auth: selectors.getAuthState(state),
});

const mapDispatchToProps = {
  onLogout: actionCreators.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
