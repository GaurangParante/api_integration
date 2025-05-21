import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard({onLogout}) {
  
  return (
    <div className="app-layout" style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header onLogout={onLogout} />
      </div>
    </div>
  );
}
export default Dashboard;
