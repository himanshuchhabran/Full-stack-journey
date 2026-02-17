import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  return (
    <>
      <div>Dashboard</div>
      {isLoggedIn ? (
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      )}
    </>
  );
};

export default Dashboard;
