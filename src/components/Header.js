import React from "react";
import { jwtDecode } from "jwt-decode";
import { encrypt, decrypt } from "../utils/encryption";
import { useNavigate } from "react-router-dom";

function Header({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const decreptedToken = jwtDecode(localStorage.getItem("token"));
    const data = encrypt({
      userId: decreptedToken.id,
    });
    try {
      const res = await fetch("http://localhost:5001/api/auth/logout", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data: data,
        }),
      });
      const encryptedRes = await res.json();
      const decreptedRes = decrypt(encryptedRes.data);
      if (res.ok) {
        console.log("Logout Successful!", decreptedRes);
        localStorage.removeItem("token");
        onLogout();
        navigate("/login");
      } else {
        console.log("Logout Failed", decreptedRes);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1>Dashboard Header</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
