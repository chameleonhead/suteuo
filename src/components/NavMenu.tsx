import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import Dropdown from "../foundation/Dropdown";
import NotificationList from "./NotificationList";

export type NavMenuProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const NavMenu = (props: NavMenuProps) => {
  const { auth, notifications, onLogout, onNotificationSelect } = props;
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  React.useEffect(() => {
    setUserMenuOpen(false);
  }, []);
  return (
    <nav className="bg-gray-800 px-4 md:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-2">
          <h1 className="text-white text-xl">
            <Link to="/">捨魚</Link>
          </h1>
        </div>
        {auth.state === "LOGGED_IN" ? (
          <div className="flex justify-between flex-auto ml-10">
            <ul className="flex space-x-2">
              <li>
                <Link
                  to="/messaging"
                  className="text-gray-200 hover:text-gray-400"
                >
                  メッセージ
                </Link>
              </li>
              <li>
                <Dropdown
                  open={notificationOpen}
                  onClose={() => setNotificationOpen(false)}
                  trigger={
                    <button
                      className="text-gray-200 focus:text-gray-400"
                      onClick={() => setNotificationOpen(true)}
                    >
                      通知
                    </button>
                  }
                >
                  <NotificationList
                    items={notifications}
                    onNotificationSelect={(e) => onNotificationSelect(e.id)}
                  ></NotificationList>
                </Dropdown>
              </li>
            </ul>
            <div>
              <Dropdown
                open={userMenuOpen}
                onClose={() => setUserMenuOpen(false)}
                trigger={
                  <button
                    className="text-gray-200 focus:text-gray-400"
                    onClick={() => setUserMenuOpen(true)}
                  >
                    {auth.user?.name || "未設定"}
                  </button>
                }
              >
                <ul className="mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <li>
                    <Link
                      to={"/users/" + auth.user!.id}
                      className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
                    >
                      プロフィール
                    </Link>
                  </li>
                  <li className="w-full">
                    <button
                      type="button"
                      onClick={onLogout}
                      className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
                    >
                      ログアウト
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        ) : null}
        {auth.state === "NOT_LOGGED_IN" ? (
          <ul className="flex space-x-3">
            <li>
              <Link
                to="/register"
                className="text-gray-200 hover:text-gray-400"
              >
                新規登録
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-200 hover:text-gray-400">
                ログイン
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  auth: selectors.getAuthState(state),
  notifications: selectors.getNotifications(state),
});

const mapDispatchToProps = {
  onLogout: actionCreators.logout,
  onNotificationSelect: actionCreators.readNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
