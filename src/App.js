import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MobileOTP from "./components/MobileOTP";
import ValidateMobileOTP from "./components/ValidateMobileOTP";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsAuthenticated(!!token);
  // }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Router>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Routes>
              <Route
                path="/login"
                element={<Login onLogin={handleLogin} />}
              ></Route>
              <Route path="/MobileOTP" element={<MobileOTP />}></Route>
              <Route
                path="/ValidateMobileOTP"
                element={<ValidateMobileOTP />}
              ></Route>
              <Route
                path="/ForgotPassword"
                element={<ForgotPassword />}
              ></Route>
              <Route path="/VerifyOTP" element={<VerifyOTP />}></Route>
              <Route path="/ResetPassword" element={<ResetPassword />}></Route>
            </Routes>
          </div>
        </Router>
      </>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard onLogout={handleLogout} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
