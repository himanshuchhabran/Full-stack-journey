import React from "react";
import AuthProvider from "../src/context/ContextProvider"
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Dashboard/>
      </div>
    </AuthProvider>
  );
};

export default App;
