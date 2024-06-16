import React from "react";
import Router from "./components/router";
import AuthProvider from "./pages/AuthProvider"; 

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
