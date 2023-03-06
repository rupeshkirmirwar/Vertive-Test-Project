import React, { useState, useEffect, useRef } from "react";
import classes from "./ValidateOTP.module.css";

const ValidateOTP = (props) => {
  const [OTPExpiration, setOTPExpiration] = useState(30);
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [showOTPStatus, setShowOTPStatus] = useState(false);
  const otpRef = useRef();
  const userIDRef = useRef();

  let expirationText =
    OTPExpiration > 0
      ? `Expires in: ${OTPExpiration} seconds`
      : "OTP Expired!!!";

  useEffect(() => {
    const interval = setInterval(() => {
      if (OTPExpiration > 0) {
        setOTPExpiration((prevCounter) => prevCounter - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [OTPExpiration]);

  const ValidateOTPHandler = async (event) => {
    event.preventDefault();
    setShowOTPStatus(false);
    const response = await fetch(
      `https://localhost:7239/api/Home/ValidateUser?userID=${userIDRef.current.value}&otp=${otpRef.current.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setIsOTPValid(data);
      setShowOTPStatus(true);
    }
  };

  return (
    <main className={classes.userform}>
      <section>
        <div className={classes.inlinebox}>
          <label className={classes.alignleft}>OTP: {props.otp}</label>
          <label>{expirationText}</label>
        </div>
      </section>
      <section>
        <form onSubmit={ValidateOTPHandler}>
          <div className={classes.control}>
            <label htmlFor="UserID">UserID</label>
            <input
              type="text"
              id="UserID"
              defaultValue={props.userID}
              ref={userIDRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="OTP">OTP</label>
            <input type="text" id="OTP" ref={otpRef} />
          </div>
          <button>Validate OTP</button>
        </form>
      </section>
      {showOTPStatus && <section>
        <div className={classes.inlinebox}>
          <h1>
            {isOTPValid? 'OTP Validation Successful': 'Invalid OTP'}
          </h1>
        </div>
        </section>}
    </main>
  );
};

export default ValidateOTP;
