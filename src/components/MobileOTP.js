import React, { useState } from "react";
import { encrypt, decrypt } from "../utils/encryption";
import { useNavigate } from "react-router-dom";

function MobileOTP() {
  const [mobile, SetMobile] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      alert("Please Enter 10 Digit Number");
      return false;
    }
    localStorage.setItem("mobile", mobile);
    const data = encrypt({ mobile: mobile });
    try {
      const res = await fetch(
        "http://localhost:5001/api/auth/send_mobile_otp",
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
      const decreptRes = decrypt(encryptedRes.data);
      if (res.ok) {
        console.log("OTP sent successfully", decreptRes);
        navigate("/ValidateMobileOTP");
      } else {
        console.log("User Not Found", decreptRes);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => {
              SetMobile(e.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MobileOTP;
