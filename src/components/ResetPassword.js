import React, { useState } from "react";
import { encrypt, decrypt } from "../utils/encryption";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Password not match");
      return;
    }
    const encData = encrypt({
      email: email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    console.log(encData);
    try {
      const res = await fetch("http://localhost:5001/api/auth/reset-password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: encData,
        }),
      });

      const encRes = await res.json();
      const decRes = decrypt(encRes.data);

      if (res.ok) {
        console.log("Password reset successfuly", decRes);
        localStorage.removeItem("email");
        navigate("/login");
      } else {
        console.log("Something went wrong", decRes);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
export default ResetPassword;
