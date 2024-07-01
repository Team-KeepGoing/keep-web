import React from "react";
import "./styles/App.css";
import Router from "./components/router";
import { AuthProvider } from "pages/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
