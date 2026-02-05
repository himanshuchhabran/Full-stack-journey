import React from "react";
import Login from "./Login";

const Dashboard = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div>This is Dashboard</div>
          <p>Of healthcare platfrom</p>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Dashboard;
