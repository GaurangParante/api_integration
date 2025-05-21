import React, { useState } from "react";
import { encrypt, decrypt } from "../utils/encryption";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const encData = encrypt({
      email: email,
      otp: otp,
    });

    try {
      const res = await fetch("http://localhost:5001/api/auth/verify-otp", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: encData,
        }),
      });

      const encRes = await res.json();
      const decData = decrypt(encRes.data);

      if (res.ok) {
        console.log("Email id verified:", decData);
        navigate("/ResetPassword")
      } else {
        console.log("Email verification Failed:", decData);
      }
    } catch (err) {
        console.log("Error", err);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email ID"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
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

export default VerifyOTP;
