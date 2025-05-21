import React, { useState } from "react";
import { encrypt, decrypt } from "../utils/encryption";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cred = encrypt({
      email: email,
      password: password,
    });
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: cred,
        }),
      });

      const encrptedRes = await res.json();
      const data = decrypt(encrptedRes.data);

      if (res.ok) {
        localStorage.setItem("token", JSON.stringify(data.token));
        onLogin();
        navigate("/dashboard");
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", data);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <br />
        <button type="submit">Login</button>
        <Link to="/forgotPassword">
          <button>Forgot Password</button>
        </Link>
      </form>
      <Link className="navbar-brand" to="/MobileOTP">
        <button>Verify with mobile OTP</button>
      </Link>
    </div>
  );
}
export default Login;
