import { useState } from "react";
import { actionCreators, selectors } from "./redux";
import { useDispatch, useSelector } from "react-redux";

import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [showSignupPage, setShowSignupPage] = useState(true);
  const authState = useSelector(selectors.getAuthState);
  const dispatch = useDispatch();
  if (authState.state === "INITIALIZING") {
    return <div className="App">読み込み中</div>;
  }
  if (authState.state !== "LOGGED_IN") {
    if (showSignupPage) {
      return (
        <div className="App">
          <h1>サインアップ</h1>
          <Signup />
          <button onClick={() => setShowSignupPage(false)}>ログイン</button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>ログイン</h1>
          <Login />
          <button onClick={() => setShowSignupPage(true)}>サインアップ</button>
        </div>
      );
    }
  }
  return (
    <div className="App">
      ホームページ
      <button onClick={() => dispatch(actionCreators.logout())}>LOGOUT</button>
    </div>
  );
}

export default App;
