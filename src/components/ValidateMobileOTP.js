import React, { useState } from "react";
import { encrypt, decrypt } from "../utils/encryption";
import { useNavigate } from "react-router-dom";

function ValidateMobileOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobile = localStorage.getItem("mobile");
    const data = encrypt({
      mobile: mobile,
      otp: otp,
    });

    try {
      const res = await fetch(
        "http://localhost:5001/api/auth/login_mobile_otp",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: data,
          }),
        }
      );

      const encryptedRes = await res.json();
      const decryptedRes = decrypt(encryptedRes.data);

      if (res.ok) {
        localStorage.setItem("token", JSON.stringify(decryptedRes.token));
        localStorage.removeItem("mobile")
        console.log("Login Successfully!!", decryptedRes);
        navigate('/dashboard')
      } else {
        console.log("Wrong OTP", decryptedRes);
      }
    } catch (err) {
      console.log("Error found", err);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Enter OTP here"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ValidateMobileOTP;
