import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

import "tailwindcss/dist/tailwind.css";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
